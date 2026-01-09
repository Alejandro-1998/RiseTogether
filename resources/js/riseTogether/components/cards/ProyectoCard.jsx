import { Link, useLocation } from "react-router-dom";

export default function ProyectoCard({ proyecto }) {
    const { pathname } = useLocation();

    // Equivalente a: !Route::is('crear_proyecto')
    // Ajusta si tu ruta real es otra
    const isCrearProyecto = pathname.includes("/proyectos/crear");

    const titulo = proyecto?.titulo ?? "Proyecto";
    const resumen = proyecto?.resumen ?? "";
    const categoria = proyecto?.categoria?.nombre ?? "General";

    // Imagen: si no hay, fallback
    const imagen =
        proyecto?.imagen_portada && String(proyecto.imagen_portada).trim() !== ""
            ? proyecto.imagen_portada
            : "/img/default-project.png";

    // Porcentaje + ancho barra (máximo 100)
    const porcentajeRaw = Number(proyecto?.porcentaje_financiado ?? 0);
    const porcentaje = Number.isFinite(porcentajeRaw) ? porcentajeRaw : 0;
    const anchoBarra = Math.min(Math.max(porcentaje, 0), 100);

    // Cantidad recaudada formateada (miles con puntos, €)
    const cantidad = Number(proyecto?.cantidad_recaudada ?? 0);
    const cantidadFmt = Number.isFinite(cantidad)
        ? cantidad.toLocaleString("es-ES", { maximumFractionDigits: 0 })
        : "0";

    // Días restantes (como en Laravel: diffInDays false => puede ser negativo)
    const hoy = new Date();
    const limite = proyecto?.fecha_limite ? new Date(proyecto.fecha_limite) : null;

    let diasRestantes = null;
    let esExpirado = false;

    if (limite instanceof Date && !Number.isNaN(limite.getTime())) {
        const ms = limite.getTime() - hoy.getTime();
        diasRestantes = Math.floor(ms / (1000 * 60 * 60 * 24));
        esExpirado = diasRestantes < 0;
    }

    // Ruta del detalle (ajústala a tu router real)
    // Si tienes slug:
    const toDetalle = proyecto?.slug ? `/proyecto/${proyecto.slug}` : "/proyecto";

    return (
        <div className="group flex h-full flex-col gap-4 overflow-hidden rounded-xl bg-[#fcfaf8] shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a120c] dark:ring-1 dark:ring-[#3a2c20]/70">
            {/* 1. IMAGEN */}
            <div
                className="aspect-video w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${imagen}')` }}
                aria-label={`Imagen del proyecto ${titulo}`}
            />

            <div className="flex flex-1 flex-col gap-4 px-4">
                <div className="flex flex-col gap-1">
                    {/* 2. CATEGORÍA */}
                    <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#f2780d]">
                            {categoria}
                        </span>
                    </div>

                    {/* 2. TÍTULO */}
                    <h3
                        className="line-clamp-1 text-base font-bold leading-normal text-[#1c140d] dark:text-[#f3f4f6]"
                        title={titulo}
                    >
                        {titulo}
                    </h3>

                    {/* 3. RESUMEN */}
                    <p className="line-clamp-3 text-sm font-normal leading-normal text-[#9c7049] dark:text-[#a18a7a]">
                        {resumen}
                    </p>
                </div>

                {/* 4 + 5. PROGRESO + ESTADÍSTICAS */}
                <div className="mt-auto">
                    <div className="mb-3 h-2 w-full rounded-full bg-gray-200 dark:bg-[#2a2017]">
                        <div
                            className="h-2 rounded-full bg-[#f2780d] transition-all duration-1000"
                            style={{ width: `${anchoBarra}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-xs font-medium text-[#9c7049] dark:text-[#a18a7a]">
                        <span>{cantidadFmt} €</span>

                        <span className={porcentaje >= 100 ? "font-bold text-green-500" : ""}>
                            {Math.round(porcentaje)}%
                        </span>

                        <span>
                            {diasRestantes === null
                                ? "—"
                                : esExpirado
                                    ? "Finalizado"
                                    : `${Math.round(diasRestantes)} días`}
                        </span>
                    </div>
                </div>
            </div>

            {/* 6. BOTÓN */}
            <div className="px-4 pb-4">
                {!isCrearProyecto && (
                    <Link
                        to={toDetalle}
                        className="flex h-10 w-full min-w-[84px] items-center justify-center overflow-hidden rounded-lg bg-[#f2780d]/20 px-4 text-sm font-bold text-[#f2780d] transition-colors duration-300 group-hover:bg-[#f2780d] group-hover:text-white dark:bg-[#f2780d]/25 dark:group-hover:text-[#f3f4f6]"
                    >
                        Ver proyecto
                    </Link>
                )}
            </div>
        </div>
    );
}