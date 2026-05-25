import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";
import ActividadReciente from "../../components/cards/actividad_reciente";

export default function AdminActividadPage() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get("/api/admin/actividad?limit=50")
      .then((res) => {
        setActividades(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
      <HeaderPublic />

      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

        <div className="flex-1 w-full">
          <main className="p-8 max-w-5xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                className="lg:hidden p-2 bg-white dark:bg-[#1a120d] rounded-lg shadow-sm border border-[#e8dace] dark:border-[#374151] self-start"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-[#1c140d] dark:text-white">Historial de actividad</h1>
                <p className="text-[#9c7049] dark:text-gray-400 mt-2 font-medium">
                  Registro completo de las acciones y eventos recientes en la plataforma.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 space-y-8 shadow-sm">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f2780d]"></div>
                   <span className="ml-3 text-gray-500">Cargando actividad...</span>
                </div>
              ) : actividades.length === 0 ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">history</span>
                  <p className="text-gray-500">No hay actividad registrada todavía.</p>
                </div>
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
          </main>
        </div>
      </div>
    </div>
  );
}
