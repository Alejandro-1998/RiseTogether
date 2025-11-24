<x-layouts.body>
    <div class="container mx-auto px-6 py-8">
        <div class="max-w-5xl mx-auto mb-8">
            <div class="flex flex-wrap justify-between gap-3">
                <div class="flex min-w-72 flex-col gap-2">
                    <h1 class="text-4xl font-black tracking-tight">Empecemos con tu proyecto</h1>
                    <p class="text-base font-normal text-[#6B7280] dark:text-[#9CA3AF]">
                        Cuéntanos
                        lo básico. Siempre podrás guardar tu progreso y volver más tarde.</p>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto grid grid-cols-12 gap-8">
            <div class="col-span-12 lg:col-span-8 space-y-6">
                <div
                    class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 bg-[#FFFFFF] dark:bg-gray-800">
                    <h3 class="text-xl font-bold mb-6">Información básica del proyecto</h3>
                    <div class="space-y-6">
                        <label class="flex flex-col">
                            <p class="text-sm font-medium pb-2">Título del proyecto</p>
                            <input
                                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                placeholder="Ej.: La cafetera espresso portátil definitiva"
                                value="La cafetera espresso portátil definitiva" />
                        </label>
                        <label class="flex flex-col">
                            <p class="text-sm font-medium pb-2">Subtítulo</p>
                            <textarea
                                class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-24 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                placeholder="Una descripción breve y llamativa de tu proyecto."></textarea>
                        </label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label class="flex flex-col">
                                <p class="text-sm font-medium pb-2">Categoría</p>
                                <select
                                    class="form-select flex w-full min-w-0 flex-1 rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]">
                                    <option>Tecnología</option>
                                    <option>Diseño</option>
                                    <option>Juegos</option>
                                    <option>Arte</option>
                                    <option>Música</option>
                                </select>
                            </label>
                            <label class="flex flex-col">
                                <p class="text-sm font-medium pb-2">Ubicación</p>
                                <input
                                    class="form-input flex w-full min-w-0 flex-1 rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                    placeholder="Ej.: Córdoba, España" value="" />
                            </label>
                        </div>
                        <div>
                            <p class="text-sm font-medium pb-2">Imagen de portada</p>
                            <div class="flex items-center justify-center w-full">
                                <label
                                    class="flex flex-col items-center justify-center w-full h-48 border-2 border-[#E5E7EB] dark:border-[#374151] border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    for="dropzone-file">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <span
                                            class="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF] mb-2 text-4xl">upload_file</span>
                                        <p
                                            class="mb-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                                            <span class="font-semibold">Haz clic para subir</span> o arrastra y
                                            suelta
                                        </p>
                                        <p class="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                            PNG, JPG o GIF (recomendado 1200x675px)</p>
                                    </div>
                                    <input class="hidden" id="dropzone-file" type="file" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-3">
                    <details
                        class="flex flex-col rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 px-6 py-2 group">
                        <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                            <p class="text-lg font-bold">Financiación</p>
                            <span
                                class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                        </summary>
                        <div class="col-span-12 lg:col-span-8 space-y-6">
                            <div
                                class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 bg-[#FFFFFF] dark:bg-gray-800">
                                <h3 class="text-xl font-bold mb-6">Ajustes de financiación</h3>

                                <div class="space-y-6">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <label class="flex flex-col md:col-span-2">
                                            <p class="text-sm font-medium pb-2">Objetivo de financiación</p>
                                            <div
                                                class="flex items-center rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 px-3">
                                                <span
                                                    class="mr-2 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                                                    €
                                                </span>
                                                <input type="number" min="1"
                                                    class="form-input flex w-full min-w-0 flex-1 rounded-xl border-0 bg-transparent text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-0 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                                    placeholder="Ej.: 10.000" />
                                            </div>
                                            <p
                                                class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                                La cantidad mínima que necesitas para hacer realidad tu
                                                proyecto.
                                            </p>
                                        </label>

                                        <label class="flex flex-col">
                                            <p class="text-sm font-medium pb-2">Moneda</p>
                                            <select
                                                class="form-select flex w-full min-w-0 flex-1 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]">
                                                <option value="EUR" selected>EUR — Euro</option>
                                                <option value="USD">USD — Dólar estadounidense</option>
                                                <option value="GBP">GBP — Libra esterlina</option>
                                            </select>
                                            <p
                                                class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                                Recibirás el dinero en esta moneda si la campaña tiene éxito.
                                            </p>
                                        </label>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label class="flex flex-col">
                                            <p class="text-sm font-medium pb-2">Duración de la campaña (días)
                                            </p>
                                            <input type="number" min="1" max="60"
                                                class="form-input flex w-full min-w-0 flex-1 rounded-xl border-border-light dark:border-border-dark bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                                placeholder="Ej.: 30" />
                                            <p
                                                class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                                La mayoría de campañas exitosas duran entre 25 y 35 días.
                                            </p>
                                        </label>

                                        <label class="flex flex-col">
                                            <p class="text-sm font-medium pb-2">Fecha de finalización (opcional)
                                            </p>
                                            <input type="date"
                                                class="form-input flex w-full min-w-0 flex-1 rounded-xl border-border-light dark:border-border-dark bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]" />
                                            <p
                                                class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                                Si la estableces, la campaña terminará exactamente ese día.
                                            </p>
                                        </label>
                                    </div>

                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Aportación mínima (opcional)</p>
                                        <div
                                            class="flex items-center rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 px-3">
                                            <span
                                                class="mr-2 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                                                €
                                            </span>
                                            <input type="number" min="1"
                                                class="form-input flex w-full min-w-0 flex-1 rounded-xl border-0 bg-transparent text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-0 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                                placeholder="Ej.: 5" />
                                        </div>
                                        <p
                                            class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            Si lo dejas vacío, los mecenas podrán aportar cualquier cantidad.
                                        </p>
                                    </label>

                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Notas internas (opcional)</p>
                                        <textarea rows="3"
                                            class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                            placeholder="Añade notas internas sobre tu presupuesto o estrategia de financiación. Solo las verás tú."></textarea>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="pb-4">
                            <p
                                class="text-[#6B7280] dark:text-[#9CA3AF] text-sm font-normal mb-6">
                                Define tu objetivo de financiación y la duración de la campaña.</p>
                            </div>
                    </details>
                    <details
                        class="flex flex-col rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 px-6 py-2 group">
                        <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                            <p class="text-lg font-bold">Historia y medios</p>
                            <span
                                class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                        </summary>
                        <div class="col-span-12 lg:col-span-8 space-y-6">
                            <div
                                class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 bg-[#FFFFFF] dark:bg-gray-800">
                                <h3 class="text-xl font-bold mb-6">Historia y medios</h3>

                                <div class="space-y-6">
                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Resumen del proyecto</p>
                                        <textarea
                                            class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                            rows="3"
                                            placeholder="Escribe un resumen breve que aparecerá al principio de la página del proyecto."></textarea>
                                        <p
                                            class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            Entre 100 y 200 caracteres funciona muy bien como introducción.
                                        </p>
                                    </label>

                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Historia completa</p>
                                        <textarea
                                            class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                            rows="7"
                                            placeholder="Cuenta la historia detrás de tu proyecto: de dónde nace la idea, qué problema resuelve, cómo lo vas a producir y qué recibirán los mecenas."></textarea>
                                        <p
                                            class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            Sé transparente y concreto. Explica el qué, el cómo y el por qué de
                                            tu proyecto.
                                        </p>
                                    </label>

                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Enlace de vídeo de presentación
                                            (opcional)</p>
                                        <input type="url"
                                            class="form-input flex w-full min-w-0 flex-1 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] h-12 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-base font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                            placeholder="Ej.: https://www.youtube.com/watch?v=tu-video" />
                                        <p
                                            class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            Puedes usar un enlace de YouTube, Vimeo u otra plataforma
                                            compatible.
                                        </p>
                                    </label>

                                    <div>
                                        <p class="text-sm font-medium pb-2">Imágenes adicionales (opcional)</p>
                                        <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-gallery"
                                                class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#E5E7EB] dark:border-[#374151] rounded-xl cursor-pointer bg-[#FFFFFF] dark:bg-gray-700 hover:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div
                                                    class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <span
                                                        class="material-symbols-outlined mb-2 text-4xl text-[#6B7280] dark:text-[#9CA3AF]">
                                                        upload_file
                                                    </span>
                                                    <p
                                                        class="mb-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                                                        <span class="font-semibold">Haz clic para subir</span> o
                                                        arrastra y
                                                        suelta
                                                    </p>
                                                    <p
                                                        class="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                                        Añade renders, fotos de prototipo o cualquier imagen que
                                                        ayude a
                                                        explicar tu proyecto.
                                                    </p>
                                                </div>
                                                <input id="dropzone-gallery" type="file" multiple
                                                    class="hidden" />
                                            </label>
                                        </div>
                                    </div>

                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Preguntas frecuentes (opcional)</p>
                                        <textarea
                                            class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                            rows="4"
                                            placeholder="Escribe posibles dudas que puedan tener los mecenas (envíos, plazos, tallas, compatibilidad, etc.). Puedes separarlas por líneas o guiones."></textarea>
                                        <p
                                            class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            Tener una sección de FAQ clara reduce mensajes repetidos y genera
                                            confianza.
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="pb-4">
                            <p
                                class="text-[#6B7280] dark:text-[#9CA3AF] text-sm font-normal mb-6">
                                Cuenta la historia de tu proyecto y añade medios para darle vida.</p>
                            </div>
                    </details>
                    <details
                        class="flex flex-col rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 px-6 py-2 group">
                        <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                            <p class="text-lg font-bold">Recompensas</p>
                            <span
                                class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                        </summary>
                        <div class="col-span-12 lg:col-span-8 space-y-6">
                            <div
                                class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 bg-[#FFFFFF] dark:bg-gray-800">
                                <h3 class="text-xl font-bold mb-6">Recompensas</h3>

                                <div class="space-y-6">
                                    <div
                                        class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-4 bg-[#FFFFFF] dark:bg-gray-700 space-y-4">
                                        <div class="flex items-center justify-between">
                                            <p class="text-sm font-semibold">Recompensa 1</p>
                                            <span
                                                class="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                                Plantilla básica de recompensa
                                            </span>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <label class="flex flex-col md:col-span-2">
                                                <p class="text-sm font-medium pb-1">Título de la recompensa</p>
                                                <input type="text"
                                                    class="form-input flex w-full min-w-0 flex-1 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 text-[#1F2937] dark:text-[#F9FAFB] h-11 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] px-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                                    placeholder="Ej.: Pack early bird – Cafetera + filtro extra" />
                                            </label>
                                            <label class="flex flex-col">
                                                <p class="text-sm font-medium pb-1">Precio</p>
                                                <div
                                                    class="flex items-center rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 px-3 h-11">
                                                    <span
                                                        class="mr-2 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                                                        €
                                                    </span>
                                                    <input type="number" min="1"
                                                        class="form-input flex w-full min-w-0 flex-1 border-0 bg-transparent text-[#1F2937] dark:text-[#F9FAFB] h-10 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-0 text-sm font-normal focus:ring-0 focus:border-0"
                                                        placeholder="Ej.: 79" />
                                                </div>
                                            </label>
                                        </div>

                                        <label class="flex flex-col">
                                            <p class="text-sm font-medium pb-1">Descripción corta</p>
                                            <textarea
                                                class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 text-[#1F2937] dark:text-[#F9FAFB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                                rows="3"
                                                placeholder="Describe de forma rápida qué incluye esta recompensa y por qué es especial."></textarea>
                                        </label>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label class="flex flex-col">
                                                <p class="text-sm font-medium pb-1">Fecha estimada de entrega
                                                </p>
                                                <input type="month"
                                                    class="form-input flex w-full min-w-0 flex-1 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 text-[#1F2937] dark:text-[#F9FAFB] h-11 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] px-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]" />
                                                <p
                                                    class="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                                    Indica en qué mes esperas enviar esta recompensa.
                                                </p>
                                            </label>
                                            <label class="flex flex-col">
                                                <p class="text-sm font-medium pb-1">Límite de unidades
                                                    (opcional)</p>
                                                <input type="number" min="1"
                                                    class="form-input flex w-full min-w-0 flex-1 rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 text-[#1F2937] dark:text-[#F9FAFB] h-11 placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] px-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                                    placeholder="Ej.: 50" />
                                                <p
                                                    class="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                                    Deja el campo vacío si no quieres limitar las unidades.
                                                </p>
                                            </label>
                                        </div>
                                    </div>

                                    <button type="button"
                                        class="flex items-center justify-center rounded-xl h-10 px-4 border border-dashed border-[#E5E7EB] dark:border-[#374151] text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <span class="material-symbols-outlined text-base mr-1">
                                            add
                                        </span>
                                        Añadir otra recompensa (más adelante podrás gestionarlas)
                                    </button>
                                </div>
                            </div>

                            <div
                                class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 bg-[#FFFFFF] dark:bg-gray-800">
                                <h3 class="text-xl font-bold mb-6">Riesgos y compromisos</h3>

                                <div class="space-y-6">
                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Riesgos y desafíos</p>
                                        <textarea
                                            class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 text-[#1F2937] dark:text-[#F9FAFB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] p-3 text-sm font-normal focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316]"
                                            rows="6"
                                            placeholder="Explica posibles retrasos, problemas de producción, logística o certificaciones, y cómo piensas gestionarlos. La transparencia genera confianza."></textarea>
                                        <p
                                            class="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            Sé honesto: ningún proyecto está libre de riesgos, pero sí puedes
                                            demostrar que
                                            tienes un plan.
                                        </p>
                                    </label>

                                    <div class="space-y-3">
                                        <label class="flex items-start gap-2">
                                            <input type="checkbox"
                                                class="mt-1 rounded border-[#E5E7EB] dark:border-[#374151] text-[#F97316] focus:ring-[#F97316]/60" />
                                            <span class="text-sm">
                                                Confirmo que he explicado de forma clara y sincera los riesgos y
                                                desafíos
                                                asociados a este proyecto.
                                            </span>
                                        </label>
                                        <label class="flex items-start gap-2">
                                            <input type="checkbox"
                                                class="mt-1 rounded border-[#E5E7EB] dark:border-[#374151] text-[#F97316] focus:ring-[#F97316]/60" />
                                            <span class="text-sm">
                                                Declaro que este proyecto respeta los derechos de autor, marcas
                                                registradas
                                                y las normas de la plataforma.
                                            </span>
                                        </label>
                                        <label class="flex items-start gap-2">
                                            <input type="checkbox"
                                                class="mt-1 rounded border-[#E5E7EB] dark:border-[#374151] text-[#F97316] focus:ring-[#F97316]/60" />
                                            <span class="text-sm">
                                                Acepto los términos y condiciones para publicar un proyecto en
                                                Rise
                                                Together.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pb-4">
                            <p
                                class="text-[#6B7280] dark:text-[#9CA3AF] text-sm font-normal mb-6">
                                Crea niveles de recompensas para tus mecenas.</p>
                            </div>
                    </details>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-4">
                <x-cards.proyecto_card />
            </div>
        </div>
    </div>
</x-layouts.body>