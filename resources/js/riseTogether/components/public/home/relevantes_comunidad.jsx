const reviews = [
  {
    id: 1,
    nombre: "Alex C.",
    user: "@alcauq",
    texto: "“Rise Together hizo que un proceso de financiación... se volviera alcanzable.”",
  },
  {
    id: 2,
    nombre: "Alex C.",
    user: "@alcauq",
    texto: "“La plataforma es clara y el apoyo de la comunidad marcó la diferencia...”",
  },
  {
    id: 3,
    nombre: "Alex C.",
    user: "@alcauq",
    texto: "“Desde el primer día sentí que el proyecto tenía futuro.”",
  },
];

export default function RelevantesComunidad() {
  return (
    <>
      {/* HR superior (igual que Blade) */}
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />

      <section className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-gray-100 p-10 shadow-sm dark:bg-[#2a2017] sm:p-14">
            <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-[#1c140d] dark:text-[#fcfaf8]">
              Relevantes de la comunidad
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <article className="rounded-2xl bg-white p-8 shadow-sm dark:bg-[#1a120c] dark:border dark:border-[#3a2c20]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                      <span aria-hidden="true">👤</span>
                    </div>

                    <div>
                      <div className="font-bold text-[#1c140d] dark:text-[#fcfaf8]">
                        {r.nombre}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-[#a18a7a]">
                        {r.user}
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 leading-relaxed text-gray-600 dark:text-[#a18a7a]">
                    {r.texto}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HR inferior (igual que Blade) */}
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />
    </>
  );
}
