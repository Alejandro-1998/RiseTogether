import { useEffect, useState } from "react";
import ProyectoCard from "../../cards/ProyectoCard";

export default function HistoriasExito() {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    fetch("/api/proyectos/historias-exito")
      .then((res) => res.json())
      .then((data) => {
        // Aseguramos que sea array
        const list = Array.isArray(data) ? data : [];
        setHistorias(list);
      })
      .catch((err) => console.error("Error cargando historias:", err));
  }, []);

  if (historias.length === 0) return null;

  return (
    <>
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />

      <section className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-gray-100 p-10 shadow-sm dark:bg-[#2a2017] sm:p-14">
            <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-[#1c140d] dark:text-[#fcfaf8]">
              Historias de éxito de Rise Together
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {historias.map((p) => (
                <div key={p.id} className="h-full">
                  <ProyectoCard proyecto={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
