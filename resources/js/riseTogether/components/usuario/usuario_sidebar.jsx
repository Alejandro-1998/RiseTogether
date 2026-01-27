export default function UsuarioSidebar({ usuario }) {
  // Fallback if no user data provided yet
  if (!usuario) return null;

  return (
    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm h-full flex flex-col gap-6">

      {/* Sección Superior: Sobre mí + Info básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#e8dace] dark:border-[#374151]">
        <section>
          <h3 className="text-base font-bold mb-2">Sobre mí</h3>
          <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed line-clamp-4">
            {usuario.biografia || "Este usuario aún no ha escrito una biografía."}
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold mb-3">Información básica</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#6b7280] dark:text-[#9ca3af]">Ubicación</dt>
              <dd className="font-medium text-right truncate">{usuario.direccion || "No especificada"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#6b7280] dark:text-[#9ca3af]">Miembro desde</dt>
              <dd className="font-medium text-right">
                {usuario.created_at
                  ? new Date(usuario.created_at).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                  : "Desconocido"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Sección Inferior: Intereses + Web */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-base font-bold mb-2">Intereses</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Tecnología sostenible", "Diseño", "Emprendimiento"].map((t) => (
              <span key={t} className="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-2.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col justify-end">
          <div className="flex justify-between items-center bg-[#f9f9f9] dark:bg-[#1f1f1f] p-3 rounded-xl border border-[#e8dace] dark:border-[#374151]">
            <h3 className="text-sm font-bold">En la web</h3>
            <div className="flex gap-3">
              <a className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d] transition-colors" href="#" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <span className="text-xs text-gray-400">RRSS</span>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
