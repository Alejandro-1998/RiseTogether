import ProyectoCard from "../../cards/ProyectoCard";

export default function TopProyectos({ proyectos = [] }) {
  const hasProyectos = Array.isArray(proyectos) && proyectos.length > 0;

  return (
    <>
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />

      <section className="py-12 bg-gray-50 dark:bg-[#120b07]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-3xl font-black text-[#1c140d] dark:text-[#fcfaf8]">
            Top proyectos del mes
          </h2>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hasProyectos ? (
              proyectos.map((p) => (
                <ProyectoCard
                  key={p.id ?? p.slug ?? JSON.stringify(p)}
                  proyecto={p}
                />
              ))
            ) : (
              <p className="lg:col-span-3 text-center text-gray-500 dark:text-gray-400">
                No hay proyectos destacados aún.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}