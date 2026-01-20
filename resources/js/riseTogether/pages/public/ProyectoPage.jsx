import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

import PortadaProyecto from "../../components/proyecto/portada_proyecto";
import ObjetivosProyecto from "../../components/proyecto/objetivos_proyecto";
import RecompensaCard from "../../components/proyecto/recompensa_card";

export default function ProyectoPage() {
  const { id } = useParams();
  const location = useLocation();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("historia"); // historia | actualizaciones | faq | comentarios
  const { isAuth, user } = useAuth(); // Get auth state

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment");
    if (paymentStatus === "success") {
      // Simple alert for now, can be replaced with a toast
      alert("¡Gracias por tu apoyo! El pago se ha realizado correctamente.");
    } else if (paymentStatus === "failed") {
      alert("El pago no se pudo completar.");
    } else if (paymentStatus === "error") {
      alert("Hubo un error al procesar el pago.");
    }
  }, [location]);

  useEffect(() => {
    let mounted = true;
    if (!id) return;

    const fetchProyecto = async () => {
      console.log("Fetching project with ID:", id); // Debug log
      try {
        const res = await fetch(`/api/proyectos/${id}`, {
          headers: { Accept: "application/json" }
        });

        if (res.ok) {
          const data = await res.json();
          console.log("PROJECT LOADED:", data);
          if (mounted) setProyecto(data);
        } else {
          console.error("PROJECT LOAD FAILED:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProyecto();
    return () => { mounted = false; };
  }, [id]);

  const tabBtn = (id, active) =>
    active
      ? "shrink-0 border-b-2 border-[#f2780d] px-1 pb-3 text-sm font-bold text-[#f2780d]"
      : "shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[#9c7049] dark:text-[#9c7049]/80 hover:border-[#f4ede7] dark:hover:border-[#f4ede7]/20 hover:text-[#1c140d] dark:hover:text-white";

  if (loading) return <div className="flex h-screen items-center justify-center text-[#9c7049]">Cargando proyecto...</div>;
  if (!proyecto) return <div className="flex h-screen items-center justify-center text-[#9c7049]">Proyecto no encontrado.</div>;

  // --- DATA MAPPING ---
  // Images
  const mainImage = proyecto.imagen_portada
    ? (proyecto.imagen_portada.startsWith('http') ? proyecto.imagen_portada : `/storage/${proyecto.imagen_portada}`)
    : "/img/default-project.png";
  const imagenes = [mainImage, mainImage, mainImage]; // Gallery placeholder

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
  };




  const handlePayment = async (amount, rewardId = null) => {
    if (!isAuth) {
      // Force redirect if not authenticated (though UI should prevent this usually)
      window.location.href = "/login";
      return;
    }

    try {
      // Use axios to ensure cookies (Sanctum) are sent. 
      // No 'Authorization' header needed for cookie-based auth.
      const response = await axios.post("/api/payment/checkout", {
        id_proyecto: proyecto.id,
        importe: amount,
        id_recompensa: rewardId
      });

      const data = response.data;

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error initiating payment:", data);
        alert("Error al iniciar el pago: " + (data.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Payment error:", error);
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

        {/* Portada + objetivos */}
        <PortadaProyecto imagenes={imagenes}>
          <ObjetivosProyecto {...objetivosProps} />
        </PortadaProyecto>

        {/* Contenido 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-[#f4ede7] dark:border-[#f4ede7]/10">
              <nav aria-label="Tabs" className="flex space-x-6">
                <button
                  type="button"
                  onClick={() => setTab("historia")}
                  className={tabBtn("historia", tab === "historia")}
                >
                  Historia
                </button>

                <button
                  type="button"
                  onClick={() => setTab("actualizaciones")}
                  className={tabBtn("actualizaciones", tab === "actualizaciones")}
                >
                  Actualizaciones
                </button>

                <button
                  type="button"
                  onClick={() => setTab("faq")}
                  className={tabBtn("faq", tab === "faq")}
                >
                  FAQ
                </button>

                <button
                  type="button"
                  onClick={() => setTab("comentarios")}
                  className={tabBtn("comentarios", tab === "comentarios")}
                >
                  Comentarios
                </button>
              </nav>
            </div>

            {/* Contenido */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-[#1c140d] dark:text-gray-300 mt-8 space-y-6">
              {tab === "historia" && (
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
                    <div className="h-20 w-20 rounded-full bg-[#f2780d]/10 flex items-center justify-center text-3xl font-black text-[#f2780d]">
                      {autorInicial}
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

              {tab === "actualizaciones" && (
                <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                  <p className="font-bold text-lg">Actualizaciones</p>
                  <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                    No hay actualizaciones publicadas todavía.
                  </p>
                </div>
              )}

              {tab === "faq" && (
                <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                  <p className="font-bold text-lg">FAQ</p>
                  <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                    El creador no ha publicado preguntas frecuentes.
                  </p>
                </div>
              )}

              {tab === "comentarios" && (
                <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                  <p className="font-bold text-lg">Comentarios</p>
                  <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                    Sé el primero en dejar un comentario.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Donación Libre */}
              <div className="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 bg-white dark:bg-[#1a120d] shadow-sm">
                <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-2">Apoya este proyecto</h3>
                <p className="text-sm text-[#9c7049] mb-4">Haz una donación sin recompensa para ayudar a que este proyecto se haga realidad.</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    id="donacionLibre"
                    placeholder="Importe (€)"
                    className="flex-1 rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] px-4 py-2 bg-transparent focus:ring-2 focus:ring-[#f2780d] outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => {
                      const val = document.getElementById('donacionLibre').value;
                      if (val >= 1) handlePayment(val);
                      else alert("El importe mínimo es 1€");
                    }}
                    className="px-4 py-2 bg-[#f2780d] text-white font-bold rounded-xl hover:bg-[#d96600] transition-colors"
                  >
                    Donar
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mt-8">Recompensas</h3>
              {proyecto.recompensas && proyecto.recompensas.length > 0 ? (
                proyecto.recompensas.map((r) => (
                  <RecompensaCard key={r.id} recompensa={r} onSupport={() => handlePayment(r.costoRecompensa, r.id)} />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[#f4ede7] dark:border-[#3a2c20] p-6 text-center">
                  <p className="text-sm text-[#9c7049]">Este proyecto no tiene recompensas configuradas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterPublic />
    </div>
  );
}