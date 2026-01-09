export default function TopProyectos({ proyectos = [] }) {
  const hasProyectos = Array.isArray(proyectos) && proyectos.length > 0;

  return (
    <>
      <hr className="my-20 border-t border-gray-300/70 dark:border-[#3a2c20]/60" />

      <section className="py-12 bg-gray-50 dark:bg-[#120b07]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-3xl font-black text-[#1c140d] dark:text-[#fcfaf8]">
            Top proyectos del mes
          </h2>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hasProyectos ? (
              proyectos.map((p) => (
                <article
                  key={p.id ?? p.titulo ?? JSON.stringify(p)}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#3a2c20] dark:bg-[#2a2017]"
                >
                  <h3 className="text-lg font-bold text-[#1c140d] dark:text-[#fcfaf8]">
                    {p.titulo ?? "Proyecto"}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-[#a18a7a]">
                    Card pendiente de migrar desde Blade.
                  </p>
                </article>
              ))
            ) : (
              <p className="lg:col-span-3 text-center text-gray-500 dark:text-[#a18a7a]">
                No hay proyectos destacados aún.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
