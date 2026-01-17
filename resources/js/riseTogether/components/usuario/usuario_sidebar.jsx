export default function UsuarioSidebar() {
  return (
    <>
      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-3">Sobre mí</h3>
        <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed">
          Diseñador de producto y entusiasta de la tecnología. Me apasiona crear soluciones
          que resuelvan problemas reales y apoyar proyectos innovadores. Creo que las buenas
          ideas crecen cuando se construyen en comunidad.
        </p>
      </section>

      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Información básica</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[#6b7280] dark:text-[#9ca3af]">Ubicación</dt>
            <dd className="font-medium text-right">San Francisco, CA</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6b7280] dark:text-[#9ca3af]">Miembro desde</dt>
            <dd className="font-medium text-right">enero 2024</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6b7280] dark:text-[#9ca3af]">Rol principal</dt>
            <dd className="font-medium text-right">Creador y mecenas</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6b7280] dark:text-[#9ca3af]">Idiomas</dt>
            <dd className="font-medium text-right">Español, Inglés</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">En la web</h3>
        <div className="flex gap-4">
          <a className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d]" href="#" aria-label="Perfil en Facebook">
            {/* Icon */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              />
            </svg>
          </a>

          <a className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d]" href="#" aria-label="Perfil en Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>

          <a className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d]" href="#" aria-label="Perfil en GitHub">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12.019c0 4.434 2.733 8.217 6.57 9.539.49.09.66-.213.66-.473 0-.234-.01-1.044-.015-2.043-2.65.576-3.2-1.12-3.2-1.12-.446-1.135-1.09-1.438-1.09-1.438-.89-.608.07-.596.07-.596.98.068 1.495 1.008 1.495 1.008.87 1.492 2.285 1.06 2.84.81.09-.63.34-1.06.615-1.305-2.168-.248-4.445-1.085-4.445-4.832 0-1.068.38-1.942 1.01-2.626-.1-.25-.44-1.24.1-2.588 0 0 .82-.263 2.68 1.002.78-.216 1.61-.324 2.44-.328.83.004 1.66.112 2.44.328 1.86-1.265 2.68-1.002 2.68-1.002.54 1.347.2 2.338.1 2.588.63.684 1.01 1.558 1.01 2.626 0 3.758-2.28 4.58-4.45 4.822.35.308.66.92.66 1.852 0 1.336-.01 2.415-.01 2.742 0 .26.17.566.66.472A10.007 10.007 0 0022 12.019C22 6.477 17.523 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Intereses</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Tecnología sostenible", "Diseño de producto", "IoT & domótica", "Huertos urbanos", "Emprendimiento"].map((t) => (
            <span key={t} className="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Categorías que más apoya</h3>

        <div className="space-y-4">
          <Bar label="Tecnología" value={85} />
          <Bar label="Diseño y arte" value={60} />
          <Bar label="Juegos" value={40} />
        </div>
      </section>
    </>
  );
}

function Bar({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <div className="bg-black/10 dark:bg-white/10 w-full rounded-full h-2">
        <div className="bg-[#f2780d] h-2 rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
