import { Link } from "react-router-dom";

export default function ProyectoCard({ proyecto, preview = false }) {
  const {
    titulo,
    categoria,
    imagen_portada,
    cantidad_recaudada = 0,
    porcentaje_financiado = 0,
    fecha_limite,
  } = proyecto;

  const anchoBarra = Math.min(porcentaje_financiado || 0, 100);

  const diasRestantes = (() => {
    if (!fecha_limite) return null;
    const end = new Date(fecha_limite).getTime();
    const now = Date.now();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff;
  })();

  const esExpirado = diasRestantes !== null && diasRestantes < 0;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#fcfaf8] dark:bg-[#1F2937] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group h-full">
      {/* Imagen */}
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover"
        style={{
          backgroundImage: `url('${imagen_portada
            ? (imagen_portada.startsWith('http') ? imagen_portada : `/storage/${imagen_portada}`)
            : "/img/default-project.png"
            }')`,
        }}
      />

      <div className="flex flex-col gap-4 px-4 flex-1">
        <div className="flex flex-col gap-1">
          {/* Categoría */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-[#f2780d] uppercase tracking-wider">
              {categoria?.nombre || "General"}
            </span>
          </div>

          {/* Título */}
          <h3
            className="text-base font-bold leading-normal text-[#1c140d] dark:text-[#F3F4F6] line-clamp-1"
            title={titulo}
          >
            {titulo}
          </h3>

          {/* Descripción */}
          <p className="text-sm font-normal leading-normal text-[#9c7049] dark:text-[#9CA3AF] line-clamp-3">
            {proyecto?.descripcion ?? ""}
          </p>
        </div>

        {/* Progreso */}
        <div className="mt-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div
              className="bg-[#f2780d] h-2 rounded-full transition-all duration-700"
              style={{ width: `${anchoBarra}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-medium text-[#9c7049] dark:text-[#9CA3AF]">
            <span>
              {Number(cantidad_recaudada).toLocaleString("es-ES")} €
            </span>
            <span className={porcentaje_financiado >= 100 ? "text-green-500 font-bold" : ""}>
              {Math.round(porcentaje_financiado)}%
            </span>
            <span>
              {diasRestantes === null
                ? "—"
                : esExpirado
                  ? "Finalizado"
                  : `${diasRestantes} días`}
            </span>
          </div>
        </div>
      </div>

      {/* Botón */}
      {!preview ? (
        <div className="px-4 pb-4">
          <Link
            to={`/proyecto/${proyecto.id}`}
            className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f2780d]/20 dark:bg-[#f2780d]/30 text-[#f2780d] text-sm font-bold group-hover:bg-[#f2780d] group-hover:text-white dark:group-hover:text-[#F3F4F6] transition-colors duration-300"
          >
            Ver proyecto
          </Link>
        </div>
      ) : (
        <div className="px-4 pb-4">
          <div className="w-full rounded-lg h-10 px-4 flex items-center justify-center bg-[#f2780d]/15 text-[#f2780d] text-sm font-bold">
            Vista previa
          </div>
        </div>
      )}
    </div>
  );
}