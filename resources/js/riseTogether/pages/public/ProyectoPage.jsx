import { useMemo, useState } from "react";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

import PortadaProyecto from "../../components/proyecto/portada_proyecto";
import ObjetivosProyecto from "../../components/proyecto/objetivos_proyecto";
import RecompensaCard from "../../components/proyecto/recompensa_card";

export default function ProyectoPage() {
  const [tab, setTab] = useState("historia"); // historia | actualizaciones | faq | comentarios

  // Mock data (igual que en Blade). Luego lo conectáis con Laravel.
  const proyecto = useMemo(
    () => ({
      titulo: "Leyendas de Aetheria",
      autor: "creadores independientes",
      imagenes: ["/img/juego.png", "/img/juego.png", "/img/juego.png"],
      historia: {
        titulo1: "Construye tu reino en el mundo de Aetheria.",
        parrafos: [
          "Leyendas de Aetheria es un juego de mesa estratégico donde cada jugador construye su propio reino mediante cartas, recursos y alianzas. Con un diseño cuidado y mecánicas únicas, invita a combinar táctica y creatividad en cada partida.",
          "A lo largo de la partida desarrollarás territorios, forjarás pactos con facciones mágicas y decidirás si prefieres avanzar mediante diplomacia, poder militar o dominio de la magia. Ninguna partida será igual a la anterior gracias a la gran variedad de cartas y combinaciones posibles.",
        ],
        figure: {
          img: "/img/juego.png",
          caption:
            "Tablero modular, cartas de reino y componentes diseñados para una experiencia inmersiva.",
        },
        titulo2: "Qué incluye tu aportación",
        lista: [
          "Caja base de Legendas de Aetheria con tablero modular y todos los componentes.",
          "Más de 200 cartas de reino, facciones, eventos y misiones.",
          "Libro de reglas ilustrado y modo campaña con historia.",
          "Todos los objetivos desbloqueados durante la campaña.",
        ],
        titulo3: "Nuestra visión",
        parrafoFinal:
          "Queremos crear un juego profundo, pero accesible, que pueda disfrutarse tanto en tardes de juego entre amigos como en sesiones más competitivas. El objetivo de esta campaña es financiar la primera tirada con materiales prémium: cartas de mayor gramaje, tablero de grosor reforzado y miniaturas de alta calidad.",
        about: {
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ6jZq92wFd0BuPv2WPwUq0cRGfK2zgB5XRsiFST7zjLl0GoE0Vx8BSjMNztuHL4c9qWfRRzd4wacBQ_00pNQwqGimVRVe2NQTNO9WOTz0ltoHLPiavzN_6-Y_9-5EpbTRIbIrtFOxwpw22pleyPDEEqCquUizLtxDvNLugsrzEMfxYo8vyDtF9Fi4zL6A-6Pqv9Wbpgc8N9rxRI0HSr5i74oQRGArpRBFfLsrkA9Di5cHk3wJdO5CrDZvKWemJFd-Bz8hBcsE8YE",
          titulo: "Sobre los creadores",
          texto:
            "Somos un pequeño equipo de diseñadores y jugadores apasionados por los juegos de mesa narrativos. Tras años probando prototipos en jornadas y clubes, queremos dar el salto a una edición profesional que mantenga el alma del proyecto pero con una producción a la altura.",
        },
      },
      objetivos: {
        porcentaje: 75,
        recaudado: 15000,
        objetivo: 20000,
        mecenas: 842,
        diasRestantes: 12,
      },
      recompensas: Array.from({ length: 7 }).map((_, i) => ({
        id: i + 1,
        precio: 10,
        titulo: "Aportación de apoyo",
        descripcion:
          "Si te gusta el proyecto pero no puedes asumir el juego completo, esta es tu opción. Aparecerás en los agradecimientos digitales.",
      })),
      contadores: {
        actualizaciones: 5,
        comentarios: 128,
      },
    }),
    []
  );

  const tabBtn = (id, active) =>
    active
      ? "shrink-0 border-b-2 border-[#f2780d] px-1 pb-3 text-sm font-bold text-[#f2780d]"
      : "shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[#9c7049] dark:text-[#9c7049]/80 hover:border-[#f4ede7] dark:hover:border-[#f4ede7]/20 hover:text-[#1c140d] dark:hover:text-white";

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
              Por {proyecto.autor}
            </p>
          </div>
        </div>

        {/* Portada + objetivos */}
        <PortadaProyecto imagenes={proyecto.imagenes}>
          <ObjetivosProyecto {...proyecto.objetivos} />
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
                  <span className="bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#9c7049] dark:text-[#9c7049]/80 ml-1 rounded-full px-2 py-0.5 text-xs">
                    {proyecto.contadores.actualizaciones}
                  </span>
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
                  <span className="bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#9c7049] dark:text-[#9c7049]/80 ml-1 rounded-full px-2 py-0.5 text-xs">
                    {proyecto.contadores.comentarios}
                  </span>
                </button>
              </nav>
            </div>

            {/* Contenido */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-[#1c140d] dark:text-gray-300 mt-8 space-y-6">
              {tab === "historia" && (
                <>
                  <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white">
                    {proyecto.historia.titulo1}
                  </h3>

                  {proyecto.historia.parrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}

                  <figure>
                    <img
                      alt="Diagrama del contenido de la caja y los componentes."
                      className="rounded-3xl"
                      src={proyecto.historia.figure.img}
                    />
                    <figcaption className="text-center text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-2">
                      {proyecto.historia.figure.caption}
                    </figcaption>
                  </figure>

                  <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white">
                    {proyecto.historia.titulo2}
                  </h3>

                  <p>
                    Al apoyar este proyecto no solo haces posible la primera edición, sino que
                    también ayudas a que más juegos de autor independiente lleguen a las mesas de juego.
                    Con tu aportación recibirás:
                  </p>

                  <ul>
                    {proyecto.historia.lista.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white">
                    {proyecto.historia.titulo3}
                  </h3>

                  <p>{proyecto.historia.parrafoFinal}</p>

                  {/* About */}
                  <div className="mt-12 !rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 flex flex-col sm:flex-row items-start gap-6 not-prose">
                    <img
                      alt="Retrato del equipo creador"
                      className="h-24 w-24 rounded-full object-cover"
                      src={proyecto.historia.about.avatar}
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#1c140d] dark:text-white">
                        {proyecto.historia.about.titulo}
                      </h4>
                      <p className="text-base text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                        {proyecto.historia.about.texto}
                      </p>
                      <button type="button" className="text-[#f2780d] font-bold text-sm mt-3 inline-block">
                        Ver otros proyectos
                      </button>
                    </div>
                  </div>
                </>
              )}

              {tab === "actualizaciones" && (
                <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                  <p className="font-bold text-lg">Actualizaciones</p>
                  <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                    Aquí irán las actualizaciones del proyecto (luego las conectamos al back).
                  </p>
                </div>
              )}

              {tab === "faq" && (
                <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                  <p className="font-bold text-lg">FAQ</p>
                  <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                    Aquí irá el FAQ del proyecto.
                  </p>
                </div>
              )}

              {tab === "comentarios" && (
                <div className="not-prose rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6">
                  <p className="font-bold text-lg">Comentarios</p>
                  <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                    Aquí irá la lista de comentarios del proyecto.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#1c140d] dark:text-white">Elige tu recompensa</h3>

              {proyecto.recompensas.map((r) => (
                <RecompensaCard key={r.id} recompensa={r} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <FooterPublic />
    </div>
  );
}
