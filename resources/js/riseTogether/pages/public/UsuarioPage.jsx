import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

import UsuarioBanner from "../../components/usuario/usuario_banner";
import EstadisticasUsuario from "../../components/cards/estadisticas_usuario";
import UsuarioTabs from "../../components/usuario/usuario_tabs";
import UsuarioSidebar from "../../components/usuario/usuario_sidebar";
import UsuarioAjustes from "../../components/usuario/usuario_ajustes";

import ProyectoCard from "../../components/proyecto/proyecto_card";
import ActividadReciente from "../../components/cards/actividad_reciente";


export default function UsuarioPage() {
  const { id } = useParams();
  const [pestana, setPestana] = useState("resumen"); // resumen | creados | apoyados | actividad | ajustes
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [soyYo, setSoyYo] = useState(false);
  const [proyectosCreados, setProyectosCreados] = useState([]);
  const [cargandoProyectos, setCargandoProyectos] = useState(false);

  useEffect(() => {
    obtenerUsuario();
  }, [id]);

  useEffect(() => {
    if (pestana === "creados" && usuario) {
      obtenerProyectosCreados();
    }
  }, [pestana, usuario]);

  const obtenerUsuario = async () => {
    setCargando(true);
    try {
      // Si hay ID, buscamos ese usuario (público). Si no, perfil propio (me).
      const endpoint = id ? `/api/users/${id}` : '/api/user/profile';
      const response = await axios.get(endpoint);
      setUsuario(response.data);

      // Determinar si soy yo (si no hay ID, es mi perfil. Si hay ID, habría q comparar con mi auth ID, pero por simplicidad: sin ID = yo)
      // Ajuste: Si navego a /usuario/MI_ID desde fuera, debería detectarlo.
      // Pero de momento: sin ID -> soy yo. Con ID -> es otro (o yo visto públicamente).
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

  const manejarActualizacionUsuario = (usuarioActualizado) => {
    setUsuario(usuarioActualizado);
  };

  if (cargando) return <div className="flex h-screen items-center justify-center">Cargando...</div>;
  if (!usuario) return <div className="flex h-screen items-center justify-center">Usuario no encontrado. <a href="/login" className="ml-2 text-blue-500">Iniciar Sesión</a></div>;

  // Map API data to component expectations
  const usuarioMapeado = {
    ...usuario,
    nombre: usuario.nombreCompleto || usuario.nombreUsuario,
    username: `@${usuario.nombreUsuario}`,
    ubicacion: usuario.direccion || 'Ubicación no disponible',
    // Use placeholders if no image (can be improved later with real uploads)
    avatarUrl: usuario.foto_perfil || "https://lh3.googleusercontent.com/aida-public/AB6AXuAwEbSTOFIZFktpB4uQ9wkgVgm1FHWTJGJlmEo1BAQcRlSTEAO0PgIU5vdw-gEqAAVE-_pXNfGYGtBW1aCjUlYkMFRwkyEWJrATqoTqeQpkcl2BtOUklo_9cDlw7Hok_IuK-_FHaGGSBBrU9zUIeyy4qILrxeJIbhQst1dCo39DWRzQd7DubZdv9otAhmsJQfjsWtZ-aDvEBMjKIKcOoP0t6iEW_vpEXt2a-oOpZ4Hj7OmMw8Z-KhrlNBAyBLCKUlZEyW4Fyb-44dw",
    bannerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy9Wss6EBRoR7h3QbFmEUvv8yYqAkAHJvQHJolGdmXUU6eXj62XpZQgfUVzCZc_WAkapFJSxbovCIb8D6h1bJuSDKxqfJ4V_yk2h8nqIHtI9nLhgyOcT53RH09ZVWxNLRGtdS2oSMEiBHj80gbB_GA0-YUwB0eHspnjYbceQyZkw4youOQoQbZVoFUDclCl2oYNu4YiR7rSoGVBeJ_qZmW7JTnrRzGW1VoYcG0_ujIk9svn-s5mIUa7t86AR_qaPxqgKf3BmSvolw"
  };

  // Calcular proyectos únicos apoyados
  const proyectosApoyadosUnicos = usuario.donaciones
    ? new Set(usuario.donaciones.map(d => d.idProyecto)).size
    : 0;

  const estadisticas = [
    { value: usuario.proyectos_creados_count?.toString() || "0", label: "Proyectos creados" },
    { value: proyectosApoyadosUnicos.toString(), label: "Proyectos apoyados" },
    { value: "1.2k", label: "Seguidores" },
    { value: "320", label: "Siguiendo" },
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
        <UsuarioBanner usuario={usuarioMapeado} />

        {/* Estadísticas */}
        <section className="flex flex-wrap gap-3 py-3 mb-6" aria-label="Estadísticas del perfil">
          {estadisticas.map((s, i) => (
            <EstadisticasUsuario key={i} value={s.value} label={s.label} />
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-8">
            <UsuarioTabs tab={pestana} setTab={setPestana} isMe={soyYo} user={usuario} />

            {/* CONTENIDO TABS */}
            <section className="pt-8 space-y-8">
              {pestana === "resumen" && (
                <>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Proyecto destacado</h3>
                    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] shadow-sm">
                      <ProyectoCard proyecto={proyectoDestacado} />
                    </article>
                  </div>

                  <section aria-labelledby="actividad-reciente-titulo">
                    <div className="flex items-center justify-between mb-3">
                      <h3 id="actividad-reciente-titulo" className="text-lg font-bold">
                        Actividad reciente
                      </h3>
                      <button className="text-xs text-[#f2780d] font-medium hover:underline">
                        Ver toda la actividad
                      </button>
                    </div>

                    <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">
                      {actividades.map((a, i) => (
                        <ActividadReciente key={i} {...a} />
                      ))}
                    </div>
                  </section>
                </>
              )}

              {pestana === "creados" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-xl">Proyectos creados</h3>
                  {cargandoProyectos ? (
                    <p>Cargando proyectos...</p>
                  ) : proyectosCreados.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6">
                  <p className="font-bold">Actividad</p>
                  <p className="mt-1 text-sm text-[#6b7280] dark:text-[#9ca3af]">
                    Aquí irá el feed completo de actividad.
                  </p>
                </div>
              )}

              {pestana === "ajustes" && soyYo && (
                <UsuarioAjustes user={usuario} onUserUpdate={manejarActualizacionUsuario} />
              )}
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <UsuarioSidebar usuario={usuarioMapeado} />
          </aside>
        </div>
      </main>

      <FooterPublic />
    </div>
  );
}
