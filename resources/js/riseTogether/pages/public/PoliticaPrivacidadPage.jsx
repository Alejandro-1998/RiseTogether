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
      <div className="bg-gray-950 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
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

export default function PoliticaPrivacidadPage() {
  const lastUpdated = "19 de mayo, 2026";
  const legalEmail = "info@montillaexperience.com";

  const sections = useMemo(
    () => [
      {
        id: "sec-01",
        num: "01",
        title: "Política de Privacidad",
        render: () => (
          <p>
            En cumplimiento de la normativa vigente en materia de protección de datos, se
            informa a los usuarios del tratamiento de sus datos personales a través del sitio
            web Montilla Experience.
          </p>
        ),
      },
      {
        id: "sec-02",
        num: "02",
        title: "Responsable del tratamiento",
        render: () => (
          <p>
            El responsable del tratamiento de los datos es Montilla Experience, como titular
            del sitio web.
          </p>
        ),
      },
      {
        id: "sec-03",
        num: "03",
        title: "Datos recopilados",
        render: () => (
          <p>
            A través del sitio web podrán recogerse datos personales como nombre, dirección
            de correo electrónico, número de teléfono y cualquier otra información facilitada
            voluntariamente por el usuario mediante formularios o canales de contacto.
          </p>
        ),
      },
      {
        id: "sec-04",
        num: "04",
        title: "Finalidad del tratamiento",
        render: () => (
          <>
            <p className="mb-2 font-semibold">
              Los datos personales serán tratados con las siguientes finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Gestionar consultas, solicitudes o comunicaciones realizadas por el usuario.
              </li>
              <li>
                Facilitar la prestación de los servicios ofrecidos a través del sitio web, en
                caso de que se encuentren habilitados.
              </li>
              <li> Mejorar la experiencia de usuario y el funcionamiento del sitio web.</li>
            </ul>
          </>
        ),
      },
      {
        id: "sec-05",
        num: "05",
        title: "Legitimación",
        render: () => (
          <p>
            La base legal para el tratamiento de los datos es el consentimiento del usuario,
            así como, en su caso, la ejecución de la relación que pudiera establecerse a
            través del sitio web.
          </p>
        ),
      },
      {
        id: "sec-06",
        num: "06",
        title: "Conservación de los datos",
        render: () => (
          <p>
            Los datos se conservarán durante el tiempo necesario para cumplir con la
            finalidad para la que fueron recogidos, así como durante los plazos exigidos por
            la normativa aplicable.
          </p>
        ),
      },
      {
        id: "sec-07",
        num: "07",
        title: "Derechos del usuario",
        render: () => (
          <p>
            El usuario podrá ejercer sus derechos de acceso, rectificación, supresión,
            limitación del tratamiento y oposición mediante solicitud a través de los canales
            de contacto disponibles en el sitio web.
          </p>
        ),
      },
      {
        id: "sec-08",
        num: "08",
        title: "Seguridad de los datos",
        render: () => (
          <p>
            Montilla Experience adopta las medidas técnicas y organizativas necesarias para
            garantizar la seguridad, integridad y confidencialidad de los datos personales,
            evitando su alteración, pérdida, tratamiento o acceso no autorizado.
          </p>
        ),
      },
      {
        id: "sec-09",
        num: "09",
        title: "Modificaciones",
        render: () => (
          <p>
            Montilla Experience se reserva el derecho de modificar la presente Política de
            Privacidad con el fin de adaptarla a cambios normativos o a la evolución del
            sitio web. Se recomienda al usuario revisar periódicamente esta política.
          </p>
        ),
      },
    ],
    []
  );

  const [openMap, setOpenMap] = useState(() => {
    const init = {};
    sections.forEach((s, idx) => (init[s.id] = idx === 0));
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
        <div className="w-full max-w-275 px-6 py-10 md:py-16">
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
              Política de Privacidad
            </span>
          </div>

          {/* Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-gray-900 dark:text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                Política de Privacidad
              </h1>
              <p className="text-gray-600 dark:text-[#baaa9c] text-lg font-normal leading-relaxed">
                Tratamiento de datos personales y compromiso de confidencialidad en Montilla Experience.
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
