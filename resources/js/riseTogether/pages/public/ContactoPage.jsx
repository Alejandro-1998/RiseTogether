import { useMemo, useState } from "react";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

function InfoCard({ icon, title, subtitle, value }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5 flex items-start gap-4">
      <div className="bg-[#f2780d]/10 p-3 rounded-xl text-[#f2780d]">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        {subtitle && <p className="text-sm opacity-70 mb-2">{subtitle}</p>}
        {value && <p className="text-[#f2780d] font-bold text-lg">{value}</p>}
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      className="size-12 rounded-xl bg-[#fbf8f4] dark:bg-[#120b07] flex items-center justify-center text-[#f2780d] hover:bg-[#f2780d] hover:text-white transition-all shadow-inner"
      href="#"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </a>
  );
}

function AdminSoporte({ admins = [] }) {
  // ✅ si aún no tienes API, deja 4 placeholders
  const adminsFinal = admins?.length
    ? admins.slice(0, 4)
    : [
        { id: 1, name: "Administrador 1", roleLabel: "Soporte", avatarUrl: "/img/admin-placeholder.png" },
        { id: 2, name: "Administrador 2", roleLabel: "Soporte", avatarUrl: "/img/admin-placeholder.png" },
        { id: 3, name: "Administrador 3", roleLabel: "Soporte", avatarUrl: "/img/admin-placeholder.png" },
        { id: 4, name: "Administrador 4", roleLabel: "Soporte", avatarUrl: "/img/admin-placeholder.png" },
      ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5">
      <h3 className="font-bold text-lg mb-4">Tu equipo de soporte</h3>

      <div className="grid grid-cols-2 gap-4">
        {adminsFinal.map((a) => (
          <div key={a.id} className="flex items-center gap-3">
            <div className="size-12 rounded-full overflow-hidden border-2 border-[#f2780d]/20">
              <img
                src={a.avatarUrl || "/img/admin-placeholder.png"}
                alt={a.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{a.name}</p>
              <p className="text-xs opacity-70">{a.roleLabel || "Administrador"}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs opacity-60 mt-4">
        *Este bloque está preparado para mostrar automáticamente a los 4 administradores (rol admin).
      </p>
    </div>
  );
}

function FAQItem({ q, a, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-left group w-full bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[#f2780d]/30 transition-all"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-bold">{q}</h4>
        <span
          className={`material-symbols-outlined text-[#f2780d] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </div>

      {open && <p className="text-sm opacity-60 mt-3">{a}</p>}
    </button>
  );
}

export default function ContactPage({ admins = [] }) {
  const [faqOpen, setFaqOpen] = useState(0);

  const faqs = useMemo(
    () => [
      {
        q: "¿Cómo publicar mi proyecto?",
        a: "Solo necesitas registrarte, completar tu perfil y seguir los pasos en el panel de creación para enviar tu idea a revisión.",
      },
      {
        q: "¿Qué comisiones se aplican?",
        a: "Cobramos un 5% sobre el total recaudado si el proyecto tiene éxito, más las tasas de procesamiento de pago.",
      },
      {
        q: "¿Es seguro donar aquí?",
        a: "Utilizamos pasarelas de pago cifradas y verificamos la identidad de cada creador para garantizar la seguridad.",
      },
      {
        q: "¿En cuánto tiempo recibo fondos?",
        a: "Una vez finalizada con éxito la campaña, los fondos se transfieren en un plazo de 7 a 14 días hábiles.",
      },
    ],
    []
  );

  return (
    <div className="bg-[#fbf8f4] dark:bg-[#120b07] text-[#1c140d] dark:text-white transition-colors duration-300 min-h-screen">
      <HeaderPublic />

      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-10 py-12 w-full">
        {/* HERO */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex h-8 items-center justify-center gap-x-2 rounded-full bg-[#f2780d]/10 px-4 mb-6">
            <span className="material-symbols-outlined text-[#f2780d] text-sm">
              support_agent
            </span>
            <p className="text-[#f2780d] text-xs font-bold uppercase tracking-widest">
              Soporte RiseTogether
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Contáctanos
          </h1>

          <p className="text-lg opacity-80 max-w-2xl">
            Estamos aquí para ayudarte a impulsar tus ideas y responder cualquier duda
            sobre nuestra plataforma de crowdfunding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-10 shadow-sm border border-black/5 dark:border-white/5">
              <h2 className="text-2xl font-bold mb-8">Envíanos un mensaje</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold opacity-70 ml-1">
                      Nombre completo
                    </label>
                    <input
                      className="w-full rounded-xl border-none bg-[#fbf8f4] dark:bg-[#120b07]/50 focus:ring-2 focus:ring-[#f2780d] p-4 transition-all"
                      placeholder="Ej. Juan Pérez"
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold opacity-70 ml-1">
                      Correo electrónico
                    </label>
                    <input
                      className="w-full rounded-xl border-none bg-[#fbf8f4] dark:bg-[#120b07]/50 focus:ring-2 focus:ring-[#f2780d] p-4 transition-all"
                      placeholder="juan@ejemplo.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold opacity-70 ml-1">
                    Asunto
                  </label>
                  <select className="w-full rounded-xl border-none bg-[#fbf8f4] dark:bg-[#120b07]/50 focus:ring-2 focus:ring-[#f2780d] p-4 transition-all appearance-none">
                    <option>Soporte técnico</option>
                    <option>Alianzas y colaboraciones</option>
                    <option>Reportar un problema</option>
                    <option>General</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold opacity-70 ml-1">
                    Mensaje
                  </label>
                  <textarea
                    className="w-full rounded-xl border-none bg-[#fbf8f4] dark:bg-[#120b07]/50 focus:ring-2 focus:ring-[#f2780d] p-4 transition-all resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows="5"
                  />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    className="rounded text-[#f2780d] focus:ring-[#f2780d] size-5 border-none bg-[#fbf8f4] dark:bg-[#120b07]/50"
                    type="checkbox"
                  />
                  <label className="text-sm opacity-70">
                    Acepto la{" "}
                    <a className="text-[#f2780d] font-bold hover:underline" href="#">
                      Política de Privacidad
                    </a>
                  </label>
                </div>

                <button
                  className="w-full bg-[#f2780d] text-white font-extrabold py-4 rounded-xl shadow-lg shadow-[#f2780d]/30 hover:shadow-xl hover:-translate-y-1 transition-all"
                  type="button"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="lg:col-span-5 space-y-6">
            <InfoCard
              icon="call"
              title="Llámanos"
              subtitle="Lun - Vie de 9:00 a 18:00"
              value="+34 900 123 456"
            />

            {/* Map/Location */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 relative group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGK7_smLf70u_9oXUGxyAspFdYHX2vJjhPIlfqmi5WYIBoAU1B-08lsS_wm4w8ve_WNrQwnVTC2o6bvWuKAFr-_15DapeS4R39etf9J56Ip5TI3GzODGQqJMWO1lmTQw-mwhlmflOIuJil6R6H5d4klLBI8isbHXS9t5Oqg2DObD5cc8lr5zB-6IK7RP4-o5ogPj3OV6FDinoxkvIUg0QCTBnlpwAb8indOWg9SMOWnTZu0nLZUe7NnQ1wYfiK69sGaFcyM-6FuXyz')",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f2780d]">
                      location_on
                    </span>
                    <span className="text-sm font-bold">Madrid, España</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Visítanos</h3>
                <p className="text-sm opacity-70 mb-4">
                  Calle de la Innovación 42, Edificio A, Madrid.
                </p>
                <a
                  className="inline-flex items-center gap-2 text-[#f2780d] text-sm font-bold hover:gap-3 transition-all"
                  href="#"
                >
                  Ver en Google Maps{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5">
              <h3 className="font-bold text-lg mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <SocialIcon icon="share" />
                <SocialIcon icon="public" />
                <SocialIcon icon="camera" />
              </div>
            </div>

            {/* ✅ Bloque admins soporte */}
            <AdminSoporte admins={admins} />
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">Preguntas frecuentes</h2>
            <p className="opacity-70">
              Encuentra respuestas rápidas a las dudas más comunes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((x, idx) => (
              <FAQItem
                key={x.q}
                q={x.q}
                a={x.a}
                open={faqOpen === idx}
                onToggle={() => setFaqOpen((prev) => (prev === idx ? -1 : idx))}
              />
            ))}
          </div>
        </section>

        {/* CTA Partners */}
        <section className="mt-24 mb-12">
          <div className="bg-[#f2780d]/10 dark:bg-[#f2780d]/5 border border-[#f2780d]/20 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-64 bg-[#f2780d]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-64 bg-[#f2780d]/20 rounded-full blur-3xl" />

            <h2 className="text-3xl font-extrabold mb-6 relative z-10">
              ¡Trabajemos juntos!
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto opacity-80 relative z-10">
              ¿Eres una empresa o una ONG? Buscamos aliados para maximizar el impacto
              social a gran escala.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="bg-[#f2780d] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform">
                Proponer colaboración
              </button>
              <button className="bg-white dark:bg-zinc-900 text-[#f2780d] border border-[#f2780d]/20 font-bold py-4 px-8 rounded-xl hover:bg-[#f2780d]/5 transition-all">
                Ver partners actuales
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterPublic />
    </div>
  );
}
