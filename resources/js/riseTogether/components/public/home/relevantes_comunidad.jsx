import { useEffect, useState } from "react";

export default function RelevantesComunidad() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/comentarios/relevantes")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching relevant comments");
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  const hasReviews = reviews.length > 0;

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
              {hasReviews ? (
                reviews.map((r) => (
                  <article
                    key={r.id} // Usamos el ID real de la BBDD
                    className="rounded-2xl bg-white p-8 shadow-sm dark:bg-[#1a120c] dark:border dark:border-[#3a2c20]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                        <span aria-hidden="true">👤</span>
                      </div>

                      <div>
                        <div className="font-bold text-[#1c140d] dark:text-[#fcfaf8]">
                          {r.user?.nombreCompleto || "Usuario anónimo"}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-[#a18a7a]">
                          @{r.user?.nombreUsuario || "anonimo"}
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 leading-relaxed text-gray-600 dark:text-[#a18a7a]">
                      “{r.mensaje}”
                    </p>
                  </article>
                ))
              ) : (
                <p className="lg:col-span-3 text-center text-gray-500 dark:text-gray-400">
                  No hay comentarios destacados recientes.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HR inferior (igual que Blade) */}
      <hr className="my-20 border-t border-gray-300/70 dark:border-gray-700/40" />
    </>
  );
}
