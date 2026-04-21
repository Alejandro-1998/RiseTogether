import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import PrivateChat from "../../components/chat/PrivateChat";

import UsuarioBanner from "../../components/usuario/usuario_banner";
import EstadisticasUsuario from "../../components/cards/estadisticas_usuario";
import UsuarioTabs from "../../components/usuario/usuario_tabs";
import UsuarioSidebar from "../../components/usuario/usuario_sidebar";
import UsuarioAjustes from "../../components/usuario/usuario_ajustes";

import ProyectoCard from "../../components/proyecto/proyecto_card";
import ActividadReciente from "../../components/cards/actividad_reciente";


export default function UsuarioPage() {
  const { id } = useParams();
  const { setUser, user: currentUser, isLoading: authLoading } = useAuth();
  const [pestana, setPestana] = useState("resumen"); // resumen | creados | apoyados | actividad | ajustes
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [soyYo, setSoyYo] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [proyectosCreados, setProyectosCreados] = useState([]);
  const [proyectosSeguidos, setProyectosSeguidos] = useState([]);
  const [cargandoProyectos, setCargandoProyectos] = useState(false);
  const [usuariosSeguidores, setUsuariosSeguidores] = useState([]);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);
  const [cargandoListas, setCargandoListas] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  const mostrarNotificacion = (msg) => {
    setMensajeNotificacion(msg);
    setTimeout(() => setMensajeNotificacion(null), 3000);
  };

  const alternarSeguimientoPerfil = async () => {
    try {
      const res = await axios.post(`/api/users/${usuario.id}/follow`);
      const estaSiguiendo = res.data.siguiendo;
      
      if (estaSiguiendo) {
        mostrarNotificacion("Has empezado a seguir a este usuario");
      } else {
        mostrarNotificacion("Has dejado de seguir a este usuario");
      }

      setUsuario({
        ...usuario, 
        siguiendo: estaSiguiendo,
        seguidores_count: estaSiguiendo 
          ? (usuario.seguidores_count || 0) + 1 
          : Math.max(0, (usuario.seguidores_count || 1) - 1)
      });
    } catch (error) {
      console.error("Error al seguir/dejar de seguir al usuario:", error);
    }
  };

  const alternarSeguirLista = async (targetUserId, tipo) => {
    try {
      const res = await axios.post(`/api/users/${targetUserId}/follow`);
      const estaSiguiendo = res.data.siguiendo;
      
      const updateList = (list) => list.map(u => 
        u.id === targetUserId ? { ...u, siguiendo: estaSiguiendo } : u
      );

      if (tipo === 'seguidores') {
        setUsuariosSeguidores(updateList(usuariosSeguidores));
      } else {
        setUsuariosSeguidos(updateList(usuariosSeguidos));
      }

      if (soyYo) {
        setUsuario(prev => ({
          ...prev,
          seguidos_count: estaSiguiendo ? (prev.seguidos_count || 0) + 1 : Math.max(0, (prev.seguidos_count || 1) - 1)
        }));
      }

      if (estaSiguiendo) {
        mostrarNotificacion("Has empezado a seguir a este usuario");
      } else {
        mostrarNotificacion("Has dejado de seguir a este usuario");
      }
    } catch (error) {
      console.error("Error al seguir/dejar de seguir en la lista:", error);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      obtenerUsuario();
      setSoyYo(!id);
    }
  }, [id, authLoading, currentUser]);

  useEffect(() => {
    if (pestana === "creados" && usuario) {
      obtenerProyectosCreados();
    }
    if (pestana === "actividad") {
      obtenerProyectosSeguidos();
    }
    if (pestana === "seguidores" && usuario) {
      obtenerUsuariosSeguidores();
    }
    if (pestana === "seguidos" && usuario) {
      obtenerUsuariosSeguidos();
    }
  }, [pestana, usuario]);

  const obtenerUsuario = async () => {
    setCargando(true);
    try {
      if (!id) {
        if (!currentUser) {
          setUsuario(null);
          return;
        }
        // Utilizar el endpoint del profile para cargar todos los detalles
        const response = await axios.get('/api/user/profile');
        setUsuario(response.data);
      } else {
        // Viendo un perfil público
        const response = await axios.get(`/api/users/${id}`);
        setUsuario(response.data);
      }
      setSoyYo(!id);
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerProyectosCreados = async () => {
    if (proyectosCreados.length > 0) return; // Ya cargados
    setCargandoProyectos(true);
    try {
      const res = await axios.get(`/api/proyectos?user_id=${usuario.id}`);
      setProyectosCreados(res.data);
    } catch (error) {
      console.error("Error obteniendo proyectos creados:", error);
    } finally {
      setCargandoProyectos(false);
    }
  };

  const obtenerProyectosSeguidos = async () => {

    const seguidosIds = JSON.parse(localStorage.getItem("seguidos")) || [];

    if (seguidosIds.length === 0) {
      setProyectosSeguidos([]);
      return;
    }

    setCargandoProyectos(true);
    try {
      // Join IDs with comma
      const idsParam = seguidosIds.join(',');
      const res = await axios.get(`/api/proyectos?ids=${idsParam}`);
      setProyectosSeguidos(res.data);
    } catch (error) {
      console.error("Error obteniendo proyectos seguidos:", error);
    } finally {
      setCargandoProyectos(false);
    }
  };

  const obtenerUsuariosSeguidores = async () => {
    setCargandoListas(true);
    try {
      const res = await axios.get(`/api/user/${usuario.id}/seguidores`);
      setUsuariosSeguidores(res.data);
    } catch (error) {
      console.error("Error obteniendo seguidores:", error);
    } finally {
      setCargandoListas(false);
    }
  };

  const obtenerUsuariosSeguidos = async () => {
    setCargandoListas(true);
    try {
      const res = await axios.get(`/api/user/${usuario.id}/seguidos`);
      setUsuariosSeguidos(res.data);
    } catch (error) {
      console.error("Error obteniendo seguidos:", error);
    } finally {
      setCargandoListas(false);
    }
  };

  const manejarActualizacionUsuario = (usuarioActualizado) => {
    setUsuario(usuarioActualizado);
    // Actualizar estado global si es mi propio perfil
    if (soyYo) {
      setUser(usuarioActualizado);
    }
  };

  if (cargando || authLoading) return <div className="flex h-screen items-center justify-center">Cargando...</div>;
  if (!usuario) return <div className="flex h-screen items-center justify-center">Usuario no encontrado. <a href="/login" className="ml-2 text-blue-500">Iniciar Sesión</a></div>;

  // Map API data to component expectations
  const usuarioMapeado = {
    ...usuario,
    nombre: usuario.nombreCompleto || usuario.nombreUsuario,
    username: `@${usuario.nombreUsuario}`,
    ubicacion: usuario.direccion || 'Ubicación no disponible',
    // Use placeholders if no image (can be improved later with real uploads)
    avatarUrl: usuario.profile_photo_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(usuario.nombreUsuario) + "&color=7F9CF5&background=EBF4FF",
    bannerUrl: usuario.banner_photo_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBy9Wss6EBRoR7h3QbFmEUvv8yYqAkAHJvQHJolGdmXUU6eXj62XpZQgfUVzCZc_WAkapFJSxbovCIb8D6h1bJuSDKxqfJ4V_yk2h8nqIHtI9nLhgyOcT53RH09ZVWxNLRGtdS2oSMEiBHj80gbB_GA0-YUwB0eHspnjYbceQyZkw4youOQoQbZVoFUDclCl2oYNu4YiR7rSoGVBeJ_qZmW7JTnrRzGW1VoYcG0_ujIk9svn-s5mIUa7t86AR_qaPxqgKf3BmSvolw"
  };

  // Calcular proyectos únicos apoyados
  const proyectosApoyadosUnicos = usuario.donaciones
    ? new Set(usuario.donaciones.map(d => d.idProyecto)).size
    : 0;

  const estadisticas = [
    { value: usuario.proyectos_creados_count?.toString() || "0", label: "Proyectos creados" },
    { value: proyectosApoyadosUnicos.toString(), label: "Proyectos apoyados" },
    { value: usuario.seguidores_count?.toString() || "0", label: "Seguidores" },
    { value: usuario.seguidos_count?.toString() || "0", label: "Siguiendo" },
  ];

  const proyectoDestacado = {
    id: 99,
    titulo: "Proyecto destacado",
    descripcion: "Este sería el proyecto destacado del usuario (mock).",
    categoria: { nombre: "General" },
    imagen_portada: null,
    cantidad_recaudada: 9800,
    porcentaje_financiado: 80,
    fecha_limite: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35),
  };

  const actividades = [
    { icon: "add_circle", color: "blue", texto: "Se ha enviado el nuevo proyecto «Dron ecológico».", tiempo: "Hace 2 minutos" },
    { icon: "favorite", color: "red", texto: "Has apoyado el proyecto «Huertos urbanos».", tiempo: "Hace 1 hora" },
    { icon: "chat_bubble", color: "green", texto: "Has comentado en «Diseño sostenible».", tiempo: "Ayer" },
    { icon: "rocket_launch", color: "orange", texto: "Tu proyecto «IoT doméstico» está en tendencia.", tiempo: "Hace 3 días" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-white">
      <HeaderPublic />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <UsuarioBanner 
          usuario={usuarioMapeado} 
          soyYo={soyYo} 
          alAlternarSeguimiento={alternarSeguimientoPerfil} 
          alIniciarChat={() => setChatUser(usuario)}
        />

        {/* Estadísticas */}
        {/* Top Section: Stats Left | Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* LEFT: Stats Panel Unified */}
          <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-8 shadow-sm h-full flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              {estadisticas.map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center">
                  <p className="text-4xl font-black text-[#1c140d] dark:text-white leading-tight mb-2">{s.value}</p>
                  <p className="text-[#9c7049] dark:text-[#9ca3af] text-sm font-bold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: User Info Panel Unified */}
          <UsuarioSidebar usuario={usuarioMapeado} />
        </div>

        <div className="flex flex-col gap-8">
          {/* MAIN */}
          <div className="w-full">
            <UsuarioTabs tab={pestana} setTab={setPestana} isMe={soyYo} user={usuario} />

            {/* CONTENIDO TABS */}
            <section className="pt-8 space-y-8">
              {pestana === "resumen" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Featured Project */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Proyecto destacado</h3>
                    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] shadow-sm">
                      <ProyectoCard proyecto={proyectoDestacado} />
                    </article>
                  </div>

                  {/* Right Column: Actividad (Old Proyectos seguidos) */}
                  <section aria-labelledby="actividad-reciente-titulo" className="h-full">
                    <div className="flex items-center justify-between mb-3">
                      <h3 id="actividad-reciente-titulo" className="text-lg font-bold">
                        Actividad
                      </h3>
                      <button className="cursor-pointer text-xs text-[#f2780d] font-medium hover:underline">
                        Ver toda la actividad
                      </button>
                    </div>

                    <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">
                      {actividades.map((a, i) => (
                        <ActividadReciente key={i} {...a} />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {pestana === "creados" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-xl">Proyectos creados</h3>
                  {cargandoProyectos ? (
                    <p>Cargando proyectos...</p>
                  ) : proyectosCreados.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {proyectosCreados.map((p) => (
                        <div key={p.id} className="rounded-2xl overflow-hidden border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] shadow-sm">
                          <ProyectoCard proyecto={p} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6">
                      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                        Este usuario no ha creado ningún proyecto todavía.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {pestana === "apoyados" && (
                <div className="space-y-4">
                  <p className="font-bold text-xl">Proyectos apoyados</p>
                  {usuario.donaciones && usuario.donaciones.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {usuario.donaciones.map((donacion) => (
                        <div key={donacion.id} className="rounded-2xl overflow-hidden border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] shadow-sm flex flex-col">
                          {/* Reusing ProyectoCard if possible, or custom display */}
                          {donacion.proyectos && <ProyectoCard proyecto={donacion.proyectos} />}

                          <div className="p-4 border-t border-[#f4ede7] dark:border-[#374151] bg-[#fcfaf8] dark:bg-[#1a120d]">
                            <p className="text-xs font-bold text-[#9c7049] uppercase tracking-wide">Tu aportación</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-bold text-lg text-[#1c140d] dark:text-white">{Number(donacion.importe).toFixed(2)}€</span>
                              <span className="text-sm px-2 py-1 rounded-md bg-[#f2780d]/10 text-[#f2780d] font-medium">
                                {donacion.recompensas ? donacion.recompensas.nombreRecompensa : 'Donación libre'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Fecha: {new Date(donacion.fechaCompra).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6">
                      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                        Este usuario no ha apoyado ningún proyecto todavía.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {pestana === "actividad" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-xl">Proyectos que sigue</h3>
                  {proyectosSeguidos && proyectosSeguidos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {proyectosSeguidos.map((p) => (
                        <div key={p.id} className="rounded-2xl overflow-hidden border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] shadow-sm">
                          <ProyectoCard proyecto={p} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6">
                      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                        No hay proyectos seguidos para mostrar.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {pestana === "seguidores" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-xl">Seguidores</h3>
                  {cargandoListas ? (
                    <p>Cargando seguidores...</p>
                  ) : usuariosSeguidores.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {usuariosSeguidores.map((u) => (
                        <div key={u.id} className="flex flex-col gap-4 p-5 bg-white dark:bg-[#2d2d2d] rounded-2xl border border-[#e8dace] dark:border-[#374151] shadow-sm transition hover:-translate-y-1 h-full">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <img src={u.profile_photo_url || `https://ui-avatars.com/api/?name=${u.nombreUsuario}`} alt={u.nombreUsuario} className="w-14 h-14 rounded-full object-cover border border-gray-100 shrink-0" />
                            <div className="truncate min-w-0">
                              <a href={`/usuario/${u.id}`} className="font-bold hover:underline truncate block text-[#1c140d] dark:text-white">
                                {u.nombreCompleto || u.nombreUsuario}
                              </a>
                              <p className="text-sm text-[#f2780d] truncate">@{u.nombreUsuario}</p>
                            </div>
                          </div>
                          
                          {currentUser && currentUser.id !== u.id && (
                            <div className="flex gap-2 w-full mt-auto pt-2">
                              <button 
                                onClick={() => alternarSeguirLista(u.id, "seguidores")}
                                className={`flex flex-1 items-center justify-center h-10 px-4 rounded-xl font-bold text-xs transition-colors ${
                                  u.siguiendo 
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" 
                                    : "bg-[#f2780d] text-white hover:bg-[#d96a0a]"
                                }`}
                              >
                                {u.siguiendo ? "Siguiendo" : "Seguir"}
                              </button>
  
                              <button 
                                onClick={() => setChatUser(u)}
                                className="flex flex-1 items-center justify-center h-10 px-4 rounded-xl font-bold text-xs border border-[#e8dace] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-[#1c140d] dark:text-white"
                              >
                                Chat
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 text-sm text-[#6b7280]">
                      Aún no tiene seguidores.
                    </div>
                  )}
                </div>
              )}

              {pestana === "seguidos" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-xl">Usuarios seguidos</h3>
                  {cargandoListas ? (
                    <p>Cargando seguidos...</p>
                  ) : usuariosSeguidos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {usuariosSeguidos.map((u) => (
                        <div key={u.id} className="flex flex-col gap-4 p-5 bg-white dark:bg-[#2d2d2d] rounded-2xl border border-[#e8dace] dark:border-[#374151] shadow-sm transition hover:-translate-y-1 h-full">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <img src={u.profile_photo_url || `https://ui-avatars.com/api/?name=${u.nombreUsuario}`} alt={u.nombreUsuario} className="w-14 h-14 rounded-full object-cover border border-gray-100 shrink-0" />
                            <div className="truncate min-w-0">
                              <a href={`/usuario/${u.id}`} className="font-bold hover:underline truncate block text-[#1c140d] dark:text-white">
                                {u.nombreCompleto || u.nombreUsuario}
                              </a>
                              <p className="text-sm text-[#f2780d] truncate">@{u.nombreUsuario}</p>
                            </div>
                          </div>
                          
                          {currentUser && currentUser.id !== u.id && (
                            <div className="flex gap-2 w-full mt-auto pt-2">
                              <button 
                                onClick={() => alternarSeguirLista(u.id, "seguidos")}
                                className={`flex flex-1 items-center justify-center h-10 px-4 rounded-xl font-bold text-xs transition-colors ${
                                  u.siguiendo 
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" 
                                    : "bg-[#f2780d] text-white hover:bg-[#d96a0a]"
                                }`}
                              >
                                {u.siguiendo ? "Siguiendo" : "Seguir"}
                              </button>
  
                              <button 
                                onClick={() => setChatUser(u)}
                                className="flex flex-1 items-center justify-center h-10 px-4 rounded-xl font-bold text-xs border border-[#e8dace] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-[#1c140d] dark:text-white"
                              >
                                Chat
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 text-sm text-[#6b7280]">
                      No sigue a ningún usuario todavía.
                    </div>
                  )}
                </div>
              )}

              {pestana === "ajustes" && soyYo && (
                <UsuarioAjustes user={usuario} onUserUpdate={manejarActualizacionUsuario} />
              )}
            </section>
          </div>
        </div>

        {/* Notificación Toast */}
        {mensajeNotificacion && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-fade-in-up">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-medium text-sm">{mensajeNotificacion}</span>
          </div>
        )}

        {/* Modal Chat */}
        {chatUser && (
          <PrivateChat destUser={chatUser} onClose={() => setChatUser(null)} />
        )}
      </main>

      <FooterPublic />
    </div>
  );
}
