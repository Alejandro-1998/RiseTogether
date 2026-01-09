import { useState } from "react";

const opciones = [
  "Tecnología & Innovación",
  "Arte & Cultura",
  "Comunidad & Bienes Sociales",
  "Juegos & Entretenimiento",
];

export default function FormularioFeedback() {
  const [tipo, setTipo] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // De momento solo prueba: luego lo conectamos al backend
    console.log({ tipo, feedback });
  }

  return (
    <section className="mb-20 px-6">
       <div className="mx-auto max-w-[1200px]">
        <div className="rounded-3xl bg-gray-100 p-10 shadow-sm dark:bg-[#2a2017] sm:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#1c140d] dark:text-[#fcfaf8]">
              Ayúdanos a mejorar
            </h2>
            <p className="mt-4 text-[#9c7049] dark:text-[#a18a7a]">
              Estamos siempre en crecimiento constante. ¿Qué tipo de proyectos te gustaría ver más?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-2xl space-y-6">
            <fieldset aria-labelledby="survey-legend" role="radiogroup">
              <legend id="survey-legend" className="sr-only">
                Categorías de proyectos
              </legend>

              <div className="space-y-4">
                {opciones.map((op) => (
                  <label
                    key={op}
                    className="flex cursor-pointer items-center rounded-lg border border-[#f4ede7] bg-[#fcfaf8] p-4 hover:border-[#f2780d] dark:border-[#2a2017] dark:bg-[#2a2017] dark:hover:border-[#f2780d]"
                  >
                    <input
                      type="radio"
                      name="project-type"
                      value={op}
                      checked={tipo === op}
                      onChange={() => setTipo(op)}
                      className="h-5 w-5 text-[#f2780d] focus:ring-[#f2780d]"
                    />
                    <span className="ml-4 text-[#1c140d] dark:text-[#fcfaf8]">
                      {op}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="feedback" className="sr-only">
                Feedback adicional
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full rounded-lg border border-[#f4ede7] bg-[#f4ede7] text-[#1c140d]
                   placeholder:text-[#9c7049] focus:border-[#f2780d] focus:ring-[#f2780d]
                   dark:border-[#3a2c20] dark:bg-[#1a120c] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a]"
                placeholder="   ¿Alguna idea adicional?"
              />
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#f2780d] px-5 text-base font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:focus-visible:ring-offset-[#1c140d]"
            >
              <span className="truncate">Enviar Feedback</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
