import { useEffect, useState } from "react";
import ProyectoCard from "../../cards/ProyectoCard"; // Asegúrate que la ruta es correcta

export default function TopProyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetch("/api/proyectos/destacados")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching projects");
        return res.json();
      })
      .then((data) => setProyectos(data))
      .catch((err) => console.error(err));
  }, []);

  const hasProyectos = Array.isArray(proyectos) && proyectos.length > 0;

  return (
    <>
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />

      <section className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-gray-100 p-10 shadow-sm dark:bg-[#2a2017] sm:p-14">
            <h2 className="mb-10 text-center text-3xl font-bold leading-tight tracking-tight text-[#1c140d] dark:text-[#fcfaf8]">
              Proyectos del mes
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hasProyectos ? (
                proyectos.map((p) => (
                  <ProyectoCard
                    // Usamos un fallback para la key por si acaso
                    key={p.id ?? p.slug}
                    proyecto={p}
                  />
                ))
              ) : (
                <p className="lg:col-span-3 text-center text-gray-500 dark:text-gray-400">
                  Cargando proyectos destacados...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
