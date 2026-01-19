export default function UsuarioSidebar({ usuario }) {
  // Fallback if no user data provided yet
  if (!usuario) return null;

  return (
    <>
      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-3">Sobre mí</h3>
        <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed">
          {usuario.biografia || "Este usuario aún no ha escrito una biografía."}
        </p>
      </section>

      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Información básica</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[#6b7280] dark:text-[#9ca3af]">Ubicación</dt>
            <dd className="font-medium text-right">{usuario.direccion || "No especificada"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6b7280] dark:text-[#9ca3af]">Miembro desde</dt>
            <dd className="font-medium text-right">
              {usuario.created_at
                ? new Date(usuario.created_at).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                : "Fecha desconocida"}
            </dd>
          </div>
          {usuario.fechaNacimiento && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#6b7280] dark:text-[#9ca3af]">Cumpleaños</dt>
              <dd className="font-medium text-right">
                {new Date(usuario.fechaNacimiento).toLocaleDateString("es-ES", { day: "numeric", month: "long" })}
              </dd>
            </div>
          )}
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
          <span className="text-xs text-gray-400 self-center">(Mock links)</span>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Intereses</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Tecnología sostenible", "Diseño", "Emprendimiento"].map((t) => (
            <span key={t} className="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
