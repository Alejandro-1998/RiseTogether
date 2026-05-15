import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";
import Stats from "../../components/admin/stats";
import TablaProyectos from "../../components/admin/tabla_proyectos";
import RevisionComentario from "../../components/admin/revision_comentario";
import ActividadReciente from "../../components/cards/actividad_reciente";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    proyectos_activos: 0,
    proyectos_pendientes: 0,
    usuarios: 0,
    ingresos: 0
  });

  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    import("axios").then((axios) => {
      axios.default.get("/api/admin/stats")
        .then((res) => {
          setStats(res.data);
        })
        .catch((err) => console.error(err));
        
      axios.default.get("/api/admin/proyectos")
        .then((res) => {
          const rev = res.data.filter(p => p.estado === 'revision').map(p => ({
            id: p.id,
            nombre: p.titulo,
            creador: p.user ? (p.user.nombreUsuario || p.user.nombreCompleto || "Desconocido") : "Desconocido",
            categoria: p.categoria ? p.categoria.nombre : "Sin categoría",
            recaudado: Number(p.cantidad_recaudada || 0),
            estado: p.estado || "borrador",
            fecha_envio: p.created_at ? p.created_at.substring(0, 10) : "",
          }));
          setPendientes(rev);
        });
    });
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const axios = (await import("axios")).default;
      await axios.put(`/api/admin/proyectos/${id}/estado`, { estado: nuevoEstado });
      setPendientes((prev) => prev.filter((p) => p.id !== id));
      import("react-hot-toast").then(toast => toast.default.success(`Proyecto ${nuevoEstado === 'publicado' ? 'aprobado' : 'rechazado'} con éxito.`));
      setStats(prev => ({...prev, proyectos_pendientes: prev.proyectos_pendientes - 1}));
    } catch (error) {
      import("react-hot-toast").then(toast => toast.default.error("Error al cambiar el estado"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
      <HeaderPublic />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 w-full">

          <main className="p-6">
            {/* TÍTULO */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                Panel de administración
              </p>
            </div>

            {/* 4 TARJETAS (stats) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Stats title="Proyectos activos" value={stats.proyectos_activos} trend="En curso" />
              <Stats title="Pendientes de revisión" value={stats.proyectos_pendientes} trend="Requieren acción" />
              <Stats title="Usuarios registrados" value={stats.usuarios.toLocaleString('es-ES')} trend="Total histórico" />
              <Stats
                title="Ingresos totales"
                value={stats.ingresos.toLocaleString('es-ES') + " €"}
                trend="Recaudado Global"
                trendColor="text-green-600 dark:text-green-500"
              />
            </div>

            {/* GRID PRINCIPAL (igual que Blade) */}
            <div className="grid grid-cols-3 gap-8 items-stretch">
              {/* PROYECTOS PENDIENTES */}
              <div className="col-span-3 lg:col-span-3">
                <h2 className="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                  Proyectos pendientes
                </h2>

                <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
                  <TablaProyectos proyectos={pendientes} onCambiarEstado={cambiarEstado} />
                </div>
              </div>

              {/* ACTIVIDAD RECIENTE */}
              <div className="col-span-3 lg:col-span-1 h-full">
                <h2 className="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                  Actividad reciente
                </h2>

                <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">
                  <ActividadReciente />
                  <ActividadReciente />
                  <ActividadReciente />
                  <ActividadReciente />
                </div>
              </div>

              {/* REVISIÓN DE COMENTARIOS */}
              <div className="col-span-3 lg:col-span-2 h-full">
                <h2 className="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                  Revisión de comentarios
                </h2>

                <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Comentarios ocultados automáticamente por contener palabras bloqueadas. Revisa cada caso antes de
                    restaurarlo o eliminarlo definitivamente.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
                      <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3">Proyecto</th>
                          <th className="px-4 py-3">Usuario</th>
                          <th className="px-4 py-3">Motivo</th>
                          <th className="px-4 py-3">Fecha</th>
                          <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        <RevisionComentario />
                        <RevisionComentario />
                        <RevisionComentario />
                        <RevisionComentario />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
