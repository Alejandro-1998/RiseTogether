import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [actividades, setActividades] = useState([]);
  const [comentarios, setComentarios] = useState([]);

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
        
      axios.default.get("/api/admin/actividad?limit=4")
        .then((res) => {
          setActividades(res.data);
        })
        .catch((err) => console.error(err));

      axios.default.get("/api/admin/comentarios/pendientes")
        .then((res) => {
          setComentarios(res.data);
        })
        .catch((err) => console.error("Error cargando comentarios", err));
    });
  }, []);

  const cambiarEstadoComentario = async (id, nuevoEstado) => {
    try {
      const axios = (await import("axios")).default;
      await axios.put(`/api/admin/comentarios/${id}/estado`, { estado: nuevoEstado });
      setComentarios((prev) => prev.filter((c) => c.id !== id));
      import("react-hot-toast").then(toast => toast.default.success(`Comentario ${nuevoEstado === 'aprobado' ? 'restaurado' : 'eliminado'}.`));
    } catch (error) {
      import("react-hot-toast").then(toast => toast.default.error("Error al actualizar comentario"));
    }
  };

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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight">
                    Actividad reciente
                  </h2>
                  <Link to="/administrador/actividad" className="text-sm text-[#f2780d] font-bold hover:underline">
                    Ver historial
                  </Link>
                </div>

                <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">
                  {actividades.length === 0 ? (
                    <p className="text-gray-500 text-sm">No hay actividad reciente.</p>
                  ) : (
                    actividades.map((act, index) => (
                      <ActividadReciente 
                        key={index}
                        icon={act.icon}
                        color={act.color}
                        texto={act.texto}
                        tiempo={act.tiempo}
                      />
                    ))
                  )}
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
                        {comentarios.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                              No hay comentarios pendientes de revisión.
                            </td>
                          </tr>
                        ) : (
                          comentarios.map((com) => (
                            <RevisionComentario
                              key={com.id}
                              proyecto={com.proyecto ? com.proyecto.titulo : "Desconocido"}
                              usuario={com.user ? `@${com.user.nombreUsuario}` : "Desconocido"}
                              motivo="Pendiente de revisión"
                              fecha={com.created_at ? com.created_at.substring(0, 10) : ""}
                              onRestaurar={() => cambiarEstadoComentario(com.id, 'aprobado')}
                              onEliminar={() => cambiarEstadoComentario(com.id, 'rechazado')}
                            />
                          ))
                        )}
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
