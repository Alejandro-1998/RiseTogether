import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
              Comentarios Destacados
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hasReviews ? (
                reviews.map((r) => (
                  <Link
                    key={r.id}
                    to={`/proyecto/${r.idProyecto}#comment-${r.id}`}
                    className="group block h-full"
                  >
                    <article
                      className="h-full rounded-2xl bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-[#1a120c] dark:border dark:border-[#3a2c20]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                          {r.user?.profile_photo_url ? (
                            <img
                              src={r.user.profile_photo_url}
                              alt={r.user.nombreUsuario}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-bold text-xl">
                              {r.user?.nombreUsuario?.charAt(0).toUpperCase() || "?"}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="font-bold text-[#1c140d] dark:text-[#fcfaf8] group-hover:text-[#f2780d] transition-colors">
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
                  </Link>
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