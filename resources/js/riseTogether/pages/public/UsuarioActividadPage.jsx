import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import ActividadReciente from "../../components/cards/actividad_reciente";

export default function UsuarioActividadPage() {
  const { id } = useParams();
  const [actividades, setActividades] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`/api/users/${id}`);
        setUsuario(userRes.data);

        const activityRes = await axios.get(`/api/user/${id}/actividad?limit=50`);
        setActividades(activityRes.data);
      } catch (error) {
        console.error("Error al cargar datos de actividad:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, [id]);

  if (cargando) return <div className="flex h-screen items-center justify-center">Cargando...</div>;
  if (!usuario) return <div className="flex h-screen items-center justify-center">Usuario no encontrado.</div>;

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-white flex flex-col">
      <HeaderPublic />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to={`/usuario/${id}`} className="text-[#f2780d] hover:underline flex items-center gap-1 text-sm font-bold mb-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver al perfil
            </Link>
            <h1 className="text-4xl font-black">Historial de actividad</h1>
            <p className="text-[#9c7049] dark:text-gray-400 mt-2 font-medium">
              Todas las interacciones de {usuario.nombreUsuario} en RiseTogether.
            </p>
          </div>
          
          <img 
            src={usuario.profile_photo_url || `https://ui-avatars.com/api/?name=${usuario.nombreUsuario}`} 
            alt={usuario.nombreUsuario}
            className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-sm object-cover"
          />
        </div>

        <div className="bg-white dark:bg-gray-900/50 border border-[#e8dace] dark:border-gray-800 rounded-3xl p-8 space-y-8 shadow-sm">
          {actividades.length > 0 ? (
            actividades.map((a, i) => (
              <ActividadReciente key={i} {...a} />
            ))
          ) : (
            <div className="text-center py-10">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">history</span>
              <p className="text-gray-500">No hay actividad registrada para este usuario.</p>
            </div>
          )}
        </div>
      </main>

      <FooterPublic />
    </div>
  );
}
