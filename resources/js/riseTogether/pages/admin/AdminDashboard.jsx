import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";
import Stats from "../../components/admin/stats";
import ProyectoPendiente from "../../components/admin/proyecto_pendiente";
import RevisionComentario from "../../components/admin/revision_comentario";
import ActividadReciente from "../../components/cards/actividad_reciente";

export default function AdminDashboard() {
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
              <Stats title="Proyectos activos" value="1.245" trend="+2,5 % vs mes anterior" />
              <Stats title="Pendientes de revisión" value="86" trend="+1,8 % vs mes anterior" />
              <Stats title="Usuarios registrados" value="15.302" trend="+5,1 % vs mes anterior" />
              <Stats
                title="Ingresos este mes"
                value="75.942 €"
                trend="-0,5 % vs mes anterior"
                trendColor="text-red-600 dark:text-red-500"
              />
            </div>

            {/* GRID PRINCIPAL (igual que Blade) */}
            <div className="grid grid-cols-3 gap-8 items-stretch">
              {/* PROYECTOS PENDIENTES */}
              <div className="col-span-3 lg:col-span-3">
                <h2 className="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                  Proyectos pendientes
                </h2>

                <div className="overflow-x-auto bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl">
                  <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3">Nombre del proyecto</th>
                        <th className="px-6 py-3">Creador</th>
                        <th className="px-6 py-3">Categoría</th>
                        <th className="px-6 py-3">Cantidad recaudada</th>
                        <th className="px-6 py-3">Estado</th>
                        <th className="px-6 py-3">Fecha de envío</th>
                        <th className="px-6 py-3 text-center">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      <ProyectoPendiente />
                      <ProyectoPendiente />
                      <ProyectoPendiente />
                      <ProyectoPendiente />
                    </tbody>
                  </table>
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
