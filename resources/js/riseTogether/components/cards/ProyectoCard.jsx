import { Link, useLocation } from "react-router-dom";

export default function ProyectoCard({ proyecto }) {
    const { pathname } = useLocation();

    // Verificamos si estamos en la ruta de crear (ajustar según tus rutas reales)
    const isCrearProyecto = pathname.includes("/crear-proyecto");

    const titulo = proyecto?.titulo ?? "Proyecto sin título";



    // NOTA: Para que esto funcione, en el controlador debes usar ->with('categoria')
    const categoria = proyecto?.categoria?.nombre ?? "General";

    // 1. LÓGICA DE IMAGEN MEJORADA
    // Soporta URLs externas (Faker) y rutas locales (storage)
    let imagen = "/img/default-project.png"; // Imagen por defecto
    if (proyecto?.imagen_portada) {
        if (proyecto.imagen_portada.startsWith('http') || proyecto.imagen_portada.startsWith('blob')) {
            imagen = proyecto.imagen_portada;
        } else {
            // Usamos la URL base inyectada desde Laravel o vacía por defecto
            const baseUrl = window.Laravel?.assetUrl || '/';
            // Nos aseguramos de no duplicar barras si baseUrl ya termina en /
            const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

            imagen = `${cleanBaseUrl}storage/${proyecto.imagen_portada}`;
        }
    }

    // 2. CÁLCULO DEL PORCENTAJE (Tu BBDD no tiene el campo 'porcentaje_financiado')
    const objetivo = Number(proyecto?.objetivo_financiacion ?? 0);
    const recaudado = Number(proyecto?.cantidad_recaudada ?? 0);

    // Evitamos división por cero
    const porcentajeCalculado = objetivo > 0 ? (recaudado / objetivo) * 100 : 0;

    // Limitamos la barra visual al 100% aunque se recaude más
    const anchoBarra = Math.min(Math.max(porcentajeCalculado, 0), 100);

    // Formateo de moneda
    const cantidadFmt = recaudado.toLocaleString("es-ES", { maximumFractionDigits: 0 });

    // 3. LÓGICA DE FECHAS (Días restantes)
    const hoy = new Date();
    const limite = proyecto?.fecha_limite ? new Date(proyecto.fecha_limite) : null;

    let diasRestantes = null;
    let esExpirado = false;

    if (limite instanceof Date && !Number.isNaN(limite.getTime())) {
        const ms = limite.getTime() - hoy.getTime();
        diasRestantes = Math.ceil(ms / (1000 * 60 * 60 * 24)); // Usamos ceil para redondear hacia arriba
        esExpirado = diasRestantes < 0;
    }

    // Ruta del enlace
    const toDetalle = proyecto?.id ? `/proyecto/${proyecto.id}` : "#";

    return (
        <div className="group flex h-full flex-col gap-4 overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a120c] dark:ring-1 dark:ring-[#3a2c20]/70">
            {/* IMAGEN DE PORTADA */}
            <div
                className="aspect-video w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${imagen}')` }}
                aria-label={`Imagen del proyecto ${titulo}`}
            >
                {/* Badge opcional si es ganador */}
                {!!proyecto?.ganadorEvento && (
                    <div className="m-2 inline-block rounded-md bg-yellow-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                        ⭐ Destacado
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-4 px-4">
                <div className="flex flex-col gap-1">
                    {/* CATEGORÍA */}
                    <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#f2780d]">
                            {categoria}
                        </span>
                    </div>

                    {/* TÍTULO */}
                    <h3
                        className="line-clamp-1 text-base font-bold leading-normal text-[#1c140d] dark:text-[#f3f4f6]"
                        title={titulo}
                    >
                        {titulo}
                    </h3>

                    {/* DESCRIPCIÓN */}
                    <p className="line-clamp-4 text-sm font-normal leading-normal text-[#9c7049] dark:text-[#a18a7a]">
                        {proyecto?.descripcion ?? ""}
                    </p>
                </div>

                {/* PROGRESO Y DATOS */}
                <div className="mt-auto">
                    {/* Barra de progreso */}
                    <div className="mb-3 h-2 w-full rounded-full bg-gray-200 dark:bg-[#2a2017]">
                        <div
                            className="h-2 rounded-full bg-[#f2780d] transition-all duration-1000"
                            style={{ width: `${anchoBarra}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-xs font-medium text-[#9c7049] dark:text-[#a18a7a]">
                        <span>{cantidadFmt} €</span>

                        <span className={porcentajeCalculado >= 100 ? "font-bold text-green-500" : ""}>
                            {Math.round(porcentajeCalculado)}%
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

            {/* BOTÓN VER PROYECTO */}
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
        </div >
    );
}