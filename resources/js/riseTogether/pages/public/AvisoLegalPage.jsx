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

function ActionBtn({ icon, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer rounded-xl h-10 px-4 bg-gray-100 dark:bg-[#393028] text-gray-900 dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-[#4a3f35] transition-colors"
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function IndexLink({ href, children }) {
  return (
    <a
      href={href}
      className="px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-200 transition text-sm"
    >
      {children}
    </a>
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

function CtaCard() {
  return (
    <div className="p-1 @container mt-8">
      <div className="flex flex-col items-stretch justify-start rounded-2xl @xl:flex-row @xl:items-center shadow-lg bg-white dark:bg-[#1c1815] border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div
          className="w-full md:w-1/3 bg-center bg-no-repeat aspect-video bg-cover"
          style={{
            backgroundImage:
              "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuDtuDPm4BFK1MGP4-dEwtGzGgq9O61Orhj2A_3QGH8Q7lJ0gxy-gX_pUesgT8ku02ETRRX-9y7JpaETyvhHn441ynRri0XdX57MbAOmy8vBBCL-Sh8cQhq74FYWigiTI6SchI7LcFGiIe7S3qFoJTFMdbuyvoM1_NQ3lr9a_I495uJHXymJwaqX7vyCjkTpaBN7LsjYUK0GLbSFQEKn7SNBqxNh1YCZO0rdKKQOJwVkpYq0qosRKgwDnze9NiqQTtH3PF18PfEN5AI\")",
          }}
        />

        <div className="flex w-full grow flex-col items-stretch justify-center gap-4 py-8 px-6 md:px-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-900 dark:text-white text-2xl font-black leading-tight tracking-[-0.015em]">
              ¿Tienes dudas legales?
            </h3>
            <p className="text-gray-600 dark:text-[#baaa9c] text-base font-normal leading-relaxed">
              Si necesitas más información sobre nuestros términos o el tratamiento
              de tus datos, estamos aquí para ayudarte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/contacto"
              className="flex min-w-[140px] items-center justify-center rounded-xl h-12 px-6 bg-[#f2780d] text-white text-base font-bold transition-all hover:scale-[1.02] shadow-md shadow-[#f2780d]/20"
            >
              Contactar ahora
            </Link>

            <Link
              to="/"
              className="flex min-w-[140px] items-center justify-center rounded-xl h-12 px-6 bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-base font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LegalNoticePage() {
  const lastUpdated = "19 de mayo, 2026";
  const legalEmail = "info@montillaexperience.com";

  const sections = useMemo(
    () => [
      {
        id: "sec-01",
        num: "01",
        title: "Aviso Legal",
        render: () => (
          <>
            <p className="mb-4">
              En cumplimiento con el deber de información recogido en el artículo 10 de la
              Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio
              Electrónico, se informa de que el presente sitio web pertenece a Montilla
              Experience.
            </p>
            <p>
              Sitio web dedicado a la promoción y difusión de experiencias
              enogastronómicas vinculadas al vino, la cultura y al territorio de Montilla. Para
              cualquier consulta o comunicación, el usuario podrá ponerse en contacto a
              través de los medios habilitados en el sitio web.
            </p>
          </>
        ),
      },
      {
        id: "sec-02",
        num: "02",
        title: "Condiciones de uso",
        render: () => (
          <>
            El usuario se compromete a utilizar el sitio web de forma adecuada, respetando
            la legislación vigente, la buena fe y el orden público. Queda prohibido el uso del
            sitio web con fines ilícitos, lesivos o que puedan dañar, inutilizar o sobrecargar
            la plataforma.
          </>
        ),
      },
      {
        id: "sec-03",
        num: "03",
        title: "Propiedad intelectual",
        render: () => (
          <>
            Todos los contenidos dentro del sitio web, incluyendo textos, diseño, estructura,
            imágenes y elementos gráficos, son propiedad de Montilla Experience o se
            utilizan con autorización, quedando prohibida su reproducción, distribución o
            transformación sin autorización.
          </>
        ),
      },
      {
        id: "sec-04",
        num: "04",
        title: "Responsabilidad",
        render: () => (
          <>
            Montilla Experience no se responsabiliza de posibles errores en los
            contenidos ni de los daños que pudieran derivarse del uso del sitio web o de la
            falta de disponibilidad del mismo.
          </>
        ),
      },
      {
        id: "sec-05",
        num: "05",
        title: "Enlaces externos",
        render: () => (
          <>
            El sitio web puede incluir enlaces a páginas de terceros con el fin de facilitar al
            usuario el acceso a información adicional o recursos de interés. Montilla Wine
            Experience no ejerce control sobre dichos sitios y, por tanto, no asume
            responsabilidad alguna por sus contenidos, disponibilidad, políticas o
            prácticas. La inclusión de estos enlaces no implica en ningún caso la existencia
            de relación, recomendación o aprobación por parte de Montilla Experience. El
            acceso a dichos sitios se realiza bajo la exclusiva responsabilidad propia del
            usuario.
          </>
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
  const onCopyLink = () => copyText(window.location.href, "Enlace copiado");

  const onPrint = () => window.print();

  const expandAll = () => {
    const next = {};
    sections.forEach((s) => (next[s.id] = true));
    setOpenMap(next);
    showToast("Secciones expandidas");
  };

  const collapseAll = () => {
    const next = {};
    sections.forEach((s, idx) => (next[s.id] = idx === 0)); // deja abierta la 01
    setOpenMap(next);
    showToast("Secciones contraídas");
  };

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
              Aviso Legal
            </span>
          </div>

          {/* Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-gray-900 dark:text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
                Aviso Legal
              </h1>
              <p className="text-gray-600 dark:text-[#baaa9c] text-lg font-normal leading-relaxed">
                Transparencia y compromiso con nuestra comunidad. Aquí detallamos los
                términos legales de Montilla Experience.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-gray-500 dark:text-[#baaa9c] text-xs font-semibold uppercase tracking-widest">
                Última actualización
              </span>
              <p className="text-gray-900 dark:text-white text-sm font-bold">
                {lastUpdated}
              </p>

              <div className="flex flex-wrap gap-2 no-print">
                <ActionBtn icon="print" onClick={onPrint}>
                  Imprimir
                </ActionBtn>
                <ActionBtn icon="unfold_more" onClick={expandAll}>
                  Expandir todo
                </ActionBtn>
                <ActionBtn icon="unfold_less" onClick={collapseAll}>
                  Contraer
                </ActionBtn>
              </div>
            </div>
          </div>

          {/* Layout: Índice + Contenido */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Índice */}
            <aside className="no-print lg:col-span-4">
              <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-900 dark:text-white font-extrabold">Índice</p>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Navega rápido
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {sections.map((s) => (
                    <IndexLink key={s.id} href={`#${s.id}`}>
                      {s.num}. {s.title}
                    </IndexLink>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-100 dark:border-gray-800 pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={onCopyLink}
                    className="w-full flex items-center justify-center gap-2 rounded-xl h-11 px-4 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <span className="material-symbols-outlined text-base">link</span>
                    Copiar enlace
                  </button>
                </div>
              </div>
            </aside>

            {/* Contenido */}
            <section className="lg:col-span-8">
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

              <CtaCard />

              <Toast open={toast.open} text={toast.text} />
            </section>
          </div>
        </div>
      </main>

      <FooterPublic />

      {/* ✅ Estilos de impresión (mantenidos) */}
      <style>{`
        @media print {
          header, footer, .no-print, .toast { display: none !important; }
          body { background: white !important; }
          .print-card { border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
