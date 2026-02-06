import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

import PortadaProyecto from "../../components/proyecto/portada_proyecto";
import ObjetivosProyecto from "../../components/proyecto/objetivos_proyecto";
import RecompensaCard from "../../components/proyecto/recompensa_card";
import ComentariosTab from "../../components/proyecto/ComentariosTab";

export default function ProyectoPage() {
  const { id } = useParams();
  const location = useLocation();
  const [proyecto, setProyecto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [pestana, setPestana] = useState("historia"); // historia | actualizaciones | faq | comentarios
  const { isAuth, user } = useAuth(); // Get auth state

  // Donation form state
  const [donationAmount, setDonationAmount] = useState("");
  const [donationError, setDonationError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const estadoPago = params.get("pago");
    if (estadoPago === "exito") {
      // Simple alert for now, can be replaced with a toast
      alert("¡Gracias por tu apoyo! El pago se ha realizado correctamente.");
    } else if (estadoPago === "fallido") {
      alert("El pago no se pudo completar.");
    } else if (estadoPago === "error") {
      alert("Hubo un error al procesar el pago.");
    }
  }, [location]);

  useEffect(() => {
    let montado = true;
    if (!id) return;

    const obtenerProyecto = async () => {
      console.log("Obteniendo proyecto con ID:", id); // Debug log
      try {
        const res = await fetch(`/api/proyectos/${id}`, {
          headers: { Accept: "application/json" }
        });

        if (res.ok) {
          const data = await res.json();
          console.log("PROYECTO CARGADO:", data);
          if (montado) setProyecto(data);
        } else {
          console.error("FALLO AL CARGAR PROYECTO:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error obteniendo proyecto:", error);
      } finally {
        if (montado) setCargando(false);
      }
    };

    obtenerProyecto();
    return () => { montado = false; };
  }, [id]);

  const btnPestana = (id, active) =>
    active
      ? "shrink-0 border-b-2 border-[#f2780d] px-1 pb-3 text-sm font-bold text-[#f2780d]"
      : "shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[#9c7049] dark:text-[#9c7049]/80 hover:border-[#f4ede7] dark:hover:border-[#f4ede7]/20 hover:text-[#1c140d] dark:hover:text-white";

  if (cargando) return <div className="flex h-screen items-center justify-center text-[#9c7049]">Cargando proyecto...</div>;
  if (!proyecto) return <div className="flex h-screen items-center justify-center text-[#9c7049]">Proyecto no encontrado.</div>;

  // --- DATA MAPPING ---
  // Images
  const getImagenPrincipal = () => {
    if (!proyecto.imagen_portada) return "/img/default-project.png";
    if (proyecto.imagen_portada.startsWith('http')) return proyecto.imagen_portada;
    if (proyecto.imagen_portada.startsWith('img/')) return `/${proyecto.imagen_portada}`;
    return `/storage/${proyecto.imagen_portada}`;
  };

  const imagenPrincipal = getImagenPrincipal();
  const imagenes = [imagenPrincipal]; // Only real images

  // Author
  const autorNombre = proyecto.user?.nombreUsuario ?? "Autor desconocido";
  const autorInicial = autorNombre.charAt(0).toUpperCase();

  // Financials
  const objetivo = Number(proyecto.objetivo_financiacion);
  const recaudado = Number(proyecto.cantidad_recaudada);
  const porcentaje = objetivo > 0 ? (recaudado / objetivo) * 100 : 0;

  // Days Remaining
  const hoy = new Date();
  const limite = new Date(proyecto.fecha_limite);
  const ms = limite.getTime() - hoy.getTime();
  const diasRestantes = Math.ceil(ms / (1000 * 60 * 60 * 24));

  const objetivosProps = {
    porcentaje: porcentaje,
    recaudado: recaudado,
    objetivo: objetivo,
    mecenas: 0, // Not in DB yet
    diasRestantes: diasRestantes > 0 ? diasRestantes : 0,
    id: proyecto.id,
    isFollowing: proyecto.is_following,
  };




  const iniciarPago = async (importe, idRecompensa = null) => {
    if (!isAuth) {
      // Force redirect if not authenticated (though UI should prevent this usually)
      window.location.href = "/login";
      return;
    }

    try {
      // Use axios to ensure cookies (Sanctum) are sent. 
      // No 'Authorization' header needed for cookie-based auth.
      const response = await axios.post("/api/pagos/iniciar", {
        id_proyecto: proyecto.id,
        importe: importe,
        id_recompensa: idRecompensa
      });

      const data = response.data;

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error iniciando pago:", data);
        alert("Error al iniciar el pago: " + (data.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error pago:", error);
      alert("Error de conexión al procesar el pago. Asegúrate de haber iniciado sesión.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-white">
      <HeaderPublic />

      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 pb-12">
        {/* Título */}
        <div className="flex flex-wrap justify-center gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-2 items-center text-center">
            <p className="text-[#1c140d] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              {proyecto.titulo}
            </p>
            <p className="text-[#9c7049] dark:text-[#9c7049]/80 text-base font-normal leading-normal">
              Por {autorNombre}
            </p>
          </div>
        </div>

        {/* Portada + objetivos + donación */}
        <PortadaProyecto imagenes={imagenes}>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ObjetivosProyecto {...objetivosProps} />

            {/* Donación Libre moved here */}
            <div className="rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 bg-white dark:bg-[#1a120d] shadow-sm">
              <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-2">Apoya este proyecto</h3>
              <p className="text-sm text-[#9c7049] mb-4">Haz una donación sin recompensa para ayudar a que este proyecto se haga realidad.</p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    id="donacionLibre"
                    value={donationAmount}
                    onChange={(e) => {
                      setDonationAmount(e.target.value);
                      if (donationError) setDonationError("");
                    }}
                    placeholder="Importe (€)"
                    className={`flex-1 rounded-xl border ${donationError ? 'border-red-500 ring-1 ring-red-500' : 'border-[#e6dbd1] dark:border-[#3a2c20]'} px-4 py-2 bg-transparent focus:ring-2 focus:ring-[#f2780d] outline-none`}
                    min="1"
                    onKeyDown={(e) => {
                      if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const val = parseFloat(donationAmount);
                      if (!val || val < 1) {
                        setDonationError("El importe mínimo es 1€");
                      } else {
                        iniciarPago(val);
                      }
                    }}
                    className="px-4 py-2 bg-[#f2780d] text-white font-bold rounded-xl hover:bg-[#d96600] transition-colors"
                  >
                    Donar
                  </button>
                </div>
                {donationError && (
                  <p className="text-sm text-red-500 font-medium">
                    {donationError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </PortadaProyecto>

        {/* Contenido Full Width */}
        <div className="mt-12">
          {/* Tabs */}
          <div className="border-b border-[#f4ede7] dark:border-[#f4ede7]/10">
            <nav aria-label="Tabs" className="flex space-x-6 overflow-x-auto">
              <button
                type="button"
                onClick={() => setPestana("historia")}
                className={btnPestana("historia", pestana === "historia")}
              >
                Historia
              </button>

              <button
                type="button"
                onClick={() => setPestana("recompensas")}
                className={btnPestana("recompensas", pestana === "recompensas")}
              >
                Recompensas
              </button>

              <button
                type="button"
                onClick={() => setPestana("actualizaciones")}
                className={btnPestana("actualizaciones", pestana === "actualizaciones")}
              >
                Actualizaciones
              </button>

              <button
                type="button"
                onClick={() => setPestana("faq")}
                className={btnPestana("faq", pestana === "faq")}
              >
                FAQ
              </button>

              <button
                type="button"
                onClick={() => setPestana("comentarios")}
                className={btnPestana("comentarios", pestana === "comentarios")}
              >
                Comentarios
              </button>
            </nav>
          </div>

          {/* Contenido */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-[#1c140d] dark:text-gray-300 mt-8 space-y-6">
            {pestana === "historia" && (
              <>
                <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white">
                  Sobre el proyecto
                </h3>

                {/* Render description preserving whitespace */}
                <div className="whitespace-pre-wrap text-base leading-relaxed text-[#5e4e42] dark:text-[#a18a7a]">
                  {proyecto.descripcion}
                </div>

                {/* About Author Section */}
                <div className="mt-12 rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 flex flex-col sm:flex-row items-start gap-6 not-prose bg-[#ffffff] dark:bg-[#1a120d]">
                  <div className="h-20 w-20 rounded-full bg-[#f2780d]/10 flex items-center justify-center text-3xl font-black text-[#f2780d] overflow-hidden">
                    {proyecto.user?.profile_photo_url ? (
                      <img
                        src={proyecto.user.profile_photo_url}
                        alt={autorNombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      autorInicial
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[#1c140d] dark:text-white">
                      {autorNombre}
                    </h4>
                    <p className="text-base text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                      {proyecto.user?.biografia || "Creador del proyecto."}
                    </p>
                    <Link to={`/usuario/${proyecto.user?.nombreUsuario ?? proyecto.user?.id}`} className="text-[#f2780d] font-bold text-sm mt-3 inline-block hover:underline">
                      Ver perfil del creador
                    </Link>
                  </div>
                </div>
              </>
            )}

            {pestana === "recompensas" && (
              <div className="not-prose space-y-6">
                <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white mb-6">
                  Selecciona tu recompensa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {proyecto.recompensas && proyecto.recompensas.length > 0 ? (
                    proyecto.recompensas.map((r) => (
                      <RecompensaCard key={r.id} recompensa={r} onSupport={() => iniciarPago(r.costoRecompensa, r.id)} />
                    ))
                  ) : (
                    <div className="col-span-full rounded-2xl border border-dashed border-[#f4ede7] dark:border-[#3a2c20] p-6 text-center">
                      <p className="text-sm text-[#9c7049]">Este proyecto no tiene recompensas configuradas.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {pestana === "actualizaciones" && (
              <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                <p className="font-bold text-lg">Actualizaciones</p>
                <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                  No hay actualizaciones publicadas todavía.
                </p>
              </div>
            )}

            {pestana === "faq" && (
              <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                <p className="font-bold text-lg">FAQ</p>
                <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                  El creador no ha publicado preguntas frecuentes.
                </p>
              </div>
            )}

            {pestana === "comentarios" && (
              <ComentariosTab proyectoId={proyecto.id} />
            )}
          </div>
        </div>
      </div>

      <FooterPublic />
    </div>
  );
}