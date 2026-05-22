export default function UsuarioSidebar({ usuario }) {
  if (!usuario) return null;

  return (
    <div className="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-6 shadow-sm h-full flex flex-col gap-6">

      <div className="flex flex-col gap-6 grow">
        <section className="grow">
          <h3 className="text-base font-bold mb-2">Sobre mí</h3>
          <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed">
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



    </div>
  );
}
