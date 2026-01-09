const historias = [
  {
    id: 1,
    titulo: "The Green Haven Café",
    texto:
      "Gracias al apoyo de más de 400 patrocinadores, este pequeño café ecológico logró abrir sus puertas en el corazón de la ciudad...",
    img: "/img/exito1.jpg",
  },
  {
    id: 2,
    titulo: "The Green Haven Café",
    texto: "Gracias al apoyo de más de 400 patrocinadores...",
    img: "/img/exito2.jpg",
  },
  {
    id: 3,
    titulo: "The Green Haven Café",
    texto: "Gracias al apoyo de más de 400 patrocinadores...",
    img: "/img/exito3.jpg",
  },
];

export default function HistoriasExito() {
  return (
    <>
      {/* Separador EXACTO al Blade */}
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />

      <section className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-gray-100 p-10 shadow-sm dark:bg-[#2a2017] sm:p-14">
            <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-[#1c140d] dark:text-[#fcfaf8]">
              Historias de éxito de Rise Together
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {historias.map((h) => (
                <article className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1a120c] dark:border dark:border-[#3a2c20]">
                  <img
                    src={h.img}
                    alt={h.titulo}
                    className="h-[190px] w-full object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1c140d] dark:text-[#fcfaf8]">
                      {h.titulo}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-[#a18a7a]">
                      {h.texto}
                    </p>

                    <button
                      type="button"
                      className="mt-5 font-semibold text-[#f2780d] hover:opacity-90"
                    >
                      Saber más →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
