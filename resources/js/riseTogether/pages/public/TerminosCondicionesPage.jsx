import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

function Toast({ open, text }) {
  return (
    <div
      className={`pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 transition-all duration-300 ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
        <span className="material-symbols-outlined text-base">check_circle</span>
        <span className="text-sm font-semibold">{text}</span>
      </div>
    </div>
  );
}

function DetailSection({ item, open, onToggle, onCopyEmail }) {
  return (
    <div id={item.id}>
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className="w-full flex cursor-pointer items-center justify-between gap-6 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center size-8 rounded-lg bg-[#f2780d]/10 text-[#f2780d] font-bold text-sm">
            {item.num}
          </span>
          <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal">
            {item.title}
          </p>
        </div>

        <span
          className={`material-symbols-outlined text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="text-gray-600 dark:text-[#baaa9c] text-base leading-relaxed pb-4 pl-12">
          {item.render({ onCopyEmail })}
        </div>
      )}

      <hr className="border-gray-100 dark:border-gray-800" />
    </div>
  );
}

export default function TerminosCondicionesPage() {
  const lastUpdated = "19 de mayo, 2026";
  const legalEmail = "info@montillaexperience.com";

  const sections = useMemo(
    () => [
      {
        id: "sec-01",
        num: "01",
        title: "Términos y Condiciones",
        render: () => (
          <p>
            El presente documento regula el acceso, navegación y uso del sitio web
            Montilla Experience, así como la contratación de los servicios ofrecidos a
            través del mismo. El acceso y uso del sitio web implica la aceptación plena y
            sin reservas de las presentes condiciones.
          </p>
        ),
      },
      {
        id: "sec-02",
        num: "02",
        title: "Objeto",
        render: () => (
          <p>
            Montilla Experience es una plataforma web orientada a la promoción, difusión
            y comercialización de experiencias enogastronómicas vinculadas al vino, la
            gastronomía y el territorio de Montilla. El contenido del sitio web tiene carácter
            informativo y podrá ser modificado en cualquier momento sin previo aviso.
          </p>
        ),
      },
      {
        id: "sec-03",
        num: "03",
        title: "Condiciones de acceso",
        render: () => (
          <p>
            El acceso al sitio web es libre y gratuito. El usuario se compromete a hacer un
            uso adecuado de los contenidos y servicios, conforme a la legislación vigente,
            la buena fe y el orden público.
          </p>
        ),
      },
      {
        id: "sec-04",
        num: "04",
        title: "Reservas y contratación",
        render: () => (
          <>
            <p className="mb-3">
              El usuario podrá realizar reservas de experiencias a través del sitio web,
              facilitando los datos requeridos y completando el proceso de contratación
              mediante los sistemas habilitados.
            </p>
            <p>
              La confirmación de la reserva estará sujeta a la correcta finalización del
              proceso de pago.
            </p>
          </>
        ),
      },
      {
        id: "sec-05",
        num: "05",
        title: "Precios y pagos",
        render: () => (
          <>
            <p className="mb-3">
              Los precios mostrados en el sitio web tienen carácter meramente informativo y
              podrán ser actualizados o modificados en cualquier momento. En el momento
              en que se habiliten servicios de contratación online, los precios aplicables
              serán los indicados en cada experiencia en el momento de la reserva,
              incluyendo los impuestos correspondientes.
            </p>
            <p>
              Las condiciones de pago, métodos disponibles y proceso de contratación se
              detallarán específicamente en cada servicio cuando este se encuentre activo
              en la plataforma.
            </p>
          </>
        ),
      },
      {
        id: "sec-06",
        num: "06",
        title: "Política de cancelación",
        render: () => (
          <p>
            Las condiciones de cancelación, modificación y reembolso podrán variar en
            función de cada experiencia ofrecida a través del sitio web. Con carácter
            general, dichas condiciones se definirán en el momento de la contratación y
            estarán disponibles para el usuario antes de completar cualquier
            reserva. Montilla Experience se reserva el derecho de establecer y ajustar las
            condiciones aplicables a cada servicio en función de su naturaleza,
            disponibilidad y características específicas.
          </p>
        ),
      },
      {
        id: "sec-07",
        num: "07",
        title: "Modificaciones del servicio",
        render: () => (
          <p>
            Montilla Experience se reserva el derecho de modificar, reprogramar, sustituir
            o cancelar cualquier actividad o actividades por causas debidamente
            justificadas, incluyendo, entre otras, condiciones meteorológicas, incidencias
            organizativas, falta de disponibilidad o supuestos de fuerza mayor. En tales
            casos, Montilla Experience podrá adoptar las medidas que considere más
            adecuadas en función de las circunstancias, incluyendo la reubicación de la
            actividad, la propuesta de alternativas o cualquier otra solución equivalente, sin
            que ello genere automáticamente derecho a compensación o reembolso, salvo
            que se indique expresamente lo contrario en las condiciones específicas de la
            experiencia.
          </p>
        ),
      },
      {
        id: "sec-08",
        num: "08",
        title: "Responsabilidad del usuario",
        render: () => (
          <>
            <p className="mb-3">
              El usuario se compromete a hacer un uso adecuado del sitio web y de los
              servicios ofrecidos, actuando en todo momento conforme a la normativa
              vigente, la buena fe y el orden público.
            </p>
            <p className="mb-2 font-semibold">El usuario se compromete a:</p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                Facilitar siempre toda la información veraz, exacta y actualizada en los
                procesos de contacto o interacción con el sitio web.
              </li>
              <li>
                Respetar todas las condiciones de uso del sitio web y mantener un
                comportamiento adecuado, responsable y ético en su relación con la
                plataforma.
              </li>
            </ul>
            <p>
              El incumplimiento de estas obligaciones podrá dar lugar a la adopción de las
              medidas que Montilla Experience considere oportunas, incluyendo, entre
              otras, la limitación o restricción del acceso al sitio web y a todos sus servicios.
            </p>
          </>
        ),
      },
      {
        id: "sec-09",
        num: "09",
        title: "Limitación de responsabilidad",
        render: () => (
          <>
            <p className="mb-3">
              Montilla Experience no será responsable de los daños o perjuicios que
              pudieran derivarse del uso del sitio web, ni de la información contenida en el
              mismo, cuando dichos daños no sean imputables directamente a una actuación
              dolosa o negligente por su parte.
            </p>
            <p>
              Asimismo, Montilla Experience no garantiza la disponibilidad continua del
              sitio web ni la ausencia de errores en los contenidos, reservándose el derecho
              de modificar, actualizar o eliminar información en cualquier momento sin previo
              aviso. El usuario será responsable del uso que realice del sitio web y de
              cualquier consecuencia derivada del mismo.
            </p>
          </>
        ),
      },
      {
        id: "sec-10",
        num: "10",
        title: "Propiedad intelectual",
        render: () => (
          <>
            <p className="mb-3">
              Todos los contenidos del sitio web, incluyendo, a título enunciativo y no
              limitativo, textos, diseños, estructura, elementos gráficos, logotipos, imágenes y
              cualquier otro material, son titularidad de Montilla Experience o se utilizan
              con la debida autorización.
            </p>
            <p>
              Queda expresamente prohibida la reproducción, distribución, comunicación
              pública, transformación o cualquier otra forma de explotación de los contenidos
              del sitio web, sin la autorización previa y expresa de Montilla Experience. El
              acceso al sitio web no implica en ningún caso la cesión de derechos sobre
              dichos contenidos, limitándose exclusivamente a un uso personal y no
              comercial por parte del usuario.
            </p>
          </>
        ),
      },
      {
        id: "sec-11",
        num: "11",
        title: "Protección de datos",
        render: () => (
          <>
            <p className="mb-3">
              Los datos personales que puedan ser recabados a través del sitio web serán
              tratados de conformidad con la normativa vigente en materia de protección de
              datos. Montilla Experience tratará dichos datos con la finalidad de gestionar
              las solicitudes, consultas o interacciones realizadas por el usuario a través del
              sitio web, así como, en su caso, para la prestación de los servicios ofrecidos.
            </p>
            <p className="mb-3">
              El tratamiento de los datos se realizará respetando en todo momento los
              principios de licitud, lealtad y transparencia, limitación de la finalidad,
              minimización de datos y seguridad.
            </p>
            <p>
              El usuario podrá obtener información detallada sobre el tratamiento de sus
              datos personales en la Política de Privacidad del sitio web, así como ejercer
              sus derechos a través de los canales de contacto habilitados.
            </p>
          </>
        ),
      },
      {
        id: "sec-12",
        num: "12",
        title: "Legislación aplicable",
        render: () => (
          <p>
            Las presentes condiciones se regirán e interpretarán de conformidad con la
            legislación española vigente. En caso de que alguna de las disposiciones aquí
            recogidas fuese declarada nula o inaplicable, ello no afectará a la validez del
            resto del contenido, que continuará siendo plenamente vigente y aplicable.
          </p>
        ),
      },
    ],
    []
  );

  const [openMap, setOpenMap] = useState(() => {
    const init = {};
    sections.forEach((s, idx) => (init[s.id] = idx === 0)); // por defecto abre la 01
    return init;
  });

  const [toast, setToast] = useState({ open: false, text: "Copiado" });

  const showToast = (text) => {
    setToast({ open: true, text });
    window.clearTimeout(window.__rtToast);
    window.__rtToast = window.setTimeout(() => {
      setToast((t) => ({ ...t, open: false }));
    }, 1800);
  };

  const copyText = async (text, okMsg = "Copiado", failMsg = "No se pudo copiar") => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(okMsg);
    } catch {
      try {
        const tmp = document.createElement("textarea");
        tmp.value = text;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        document.body.removeChild(tmp);
        showToast(okMsg);
      } catch {
        showToast(failMsg);
      }
    }
  };

  const onCopyEmail = (email) => copyText(email, "Email copiado");

  const toggleOne = (id) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#f9f8f6] dark:bg-[#120b07] transition-colors duration-300 min-h-screen">
      <HeaderPublic />

      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[1100px] px-6 py-10 md:py-16">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-[#f2780d] transition-colors"
              to="/"
            >
              Inicio
            </Link>
            <span className="text-gray-400 dark:text-gray-600 text-sm font-medium">
              /
            </span>
            <span className="text-gray-900 dark:text-white text-sm font-bold">
              Términos y Condiciones
            </span>
          </div>

          {/* Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-gray-900 dark:text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                Términos y Condiciones
              </h1>
              <p className="text-gray-600 dark:text-[#baaa9c] text-lg font-normal leading-relaxed">
                Condiciones de uso y regulaciones del sitio web Montilla Experience.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-gray-500 dark:text-[#baaa9c] text-xs font-semibold uppercase tracking-widest">
                Última actualización
              </span>
              <p className="text-gray-900 dark:text-white text-sm font-bold">
                {lastUpdated}
              </p>
            </div>
          </div>

          {/* Layout: Contenido Centrado */}
          <div className="mx-auto max-w-3xl">
            {/* Contenido */}
            <section className="w-full">
              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm print-card">
                <div className="flex flex-col p-6 md:p-8 gap-0">
                  {sections.map((item) => (
                    <DetailSection
                      key={item.id}
                      item={item}
                      open={!!openMap[item.id]}
                      onToggle={toggleOne}
                      onCopyEmail={onCopyEmail}
                    />
                  ))}
                </div>
              </div>

              <Toast open={toast.open} text={toast.text} />
            </section>
          </div>
        </div>
      </main>

      <FooterPublic />
    </div>
  );
}
