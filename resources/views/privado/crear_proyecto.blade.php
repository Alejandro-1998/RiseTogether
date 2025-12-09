<x-layouts.body>
    <div class="container mx-auto px-6 py-8">
        <form method="POST" action="{{ route('proyectos.store') }}" enctype="multipart/form-data">
            @csrf

            {{-- CABECERA --}}
            <div class="max-w-5xl mx-auto mb-8">
                <div class="flex flex-wrap justify-between gap-3">
                    <div class="flex min-w-72 flex-col gap-2">
                        <h1 class="text-4xl font-black tracking-tight">Empecemos con tu proyecto</h1>
                        <p class="text-base font-normal text-[#6B7280] dark:text-[#9CA3AF]">
                            Cuéntanos lo básico. Verás los cambios en la tarjeta de la derecha.
                        </p>
                    </div>
                    {{-- Botón de Guardar --}}
                    <div class="flex items-center">
                        <button type="submit"
                            class="rounded-xl bg-[#F97316] px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-[#ea580c] hover:shadow-xl transition-all focus:ring-4 focus:ring-[#F97316]/30">
                            Guardar Proyecto
                        </button>
                    </div>
                </div>
            </div>

            {{-- GRID PRINCIPAL --}}
            <div class="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                
                {{-- COLUMNA IZQUIERDA (FORMULARIO) --}}
                <div class="col-span-12 lg:col-span-8 space-y-6">
                    
                    {{-- 1. INFORMACIÓN BÁSICA --}}
                    <div class="rounded-xl border border-[#E5E7EB] dark:border-[#374151] p-6 bg-[#FFFFFF] dark:bg-gray-800 shadow-sm">
                        <h3 class="text-xl font-bold mb-6">Información básica</h3>
                        <div class="space-y-6">
                            
                            {{-- Título --}}
                            <label class="flex flex-col">
                                <p class="text-sm font-medium pb-2">Título del proyecto</p>
                                <input name="titulo" id="input_titulo" type="text" value="{{ old('titulo') }}" required
                                    class="form-input w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 h-12 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white"
                                    placeholder="Ej.: La cafetera espresso definitiva" />
                                @error('titulo') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                            </label>

                            {{-- Resumen (Subtítulo) --}}
                            <label class="flex flex-col">
                                <p class="text-sm font-medium pb-2">Subtítulo (Resumen corto)</p>
                                <textarea name="resumen" id="input_resumen" required
                                    class="form-textarea w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 h-24 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white"
                                    placeholder="Una descripción breve para la tarjeta del proyecto.">{{ old('resumen') }}</textarea>
                                @error('resumen') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                            </label>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {{-- Categoría Dinámica --}}
                                <label class="flex flex-col">
                                    <p class="text-sm font-medium pb-2">Categoría</p>
                                    <select name="categoria_id" id="input_categoria" required
                                        class="form-select w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 h-12 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white">
                                        <option value="" disabled selected>Selecciona una...</option>
                                        @foreach($categorias as $cat)
                                            <option value="{{ $cat->id }}" {{ old('categoria_id') == $cat->id ? 'selected' : '' }}>
                                                {{ $cat->nombre }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('categoria_id') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                                </label>
                                
                                {{-- Ubicación (Decorativo por ahora) --}}
                                <label class="flex flex-col">
                                    <p class="text-sm font-medium pb-2">Ubicación</p>
                                    <input disabled title="Próximamente"
                                        class="form-input w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-gray-100 dark:bg-gray-600 h-12 p-3 cursor-not-allowed opacity-70"
                                        placeholder="España (Automático)" />
                                </label>
                            </div>

                            {{-- Imagen de Portada --}}
                            <div>
                                <p class="text-sm font-medium pb-2">Imagen de portada</p>
                                <div class="flex items-center justify-center w-full">
                                    <label for="imagen_portada"
                                        class="flex flex-col items-center justify-center w-full h-48 border-2 border-[#E5E7EB] dark:border-[#374151] border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <span class="material-symbols-outlined text-[#6B7280] text-4xl mb-2">image</span>
                                            <p class="mb-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]"><span class="font-bold">Clic para subir imagen</span></p>
                                            <p class="text-xs text-[#6B7280] dark:text-[#9CA3AF]">JPG, PNG (Max 2MB)</p>
                                        </div>
                                        <input id="imagen_portada" name="imagen_portada" type="file" class="hidden" accept="image/*" />
                                    </label>
                                </div>
                                @error('imagen_portada') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                            </div>
                        </div>
                    </div>

                    {{-- 2. FINANCIACIÓN --}}
                    <div class="space-y-3">
                        <details class="flex flex-col rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 px-6 py-2 group shadow-sm" open>
                            <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none text-[#1c140d] dark:text-[#fcfaf8]">
                                <p class="text-lg font-bold">Financiación</p>
                                <span class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </summary>
                            
                            <div class="py-6 space-y-6 border-t border-gray-100 dark:border-gray-700 mt-2">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {{-- Objetivo --}}
                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Objetivo (€)</p>
                                        <input name="objetivo_financiacion" id="input_objetivo" type="number" min="100" step="0.01" required
                                            value="{{ old('objetivo_financiacion') }}"
                                            class="form-input w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 h-12 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white"
                                            placeholder="Ej: 10000" />
                                         @error('objetivo_financiacion') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                                    </label>

                                    {{-- Duración --}}
                                    <label class="flex flex-col">
                                        <p class="text-sm font-medium pb-2">Duración (Días)</p>
                                        <input name="duracion_dias" id="input_dias" type="number" min="1" max="90" required
                                            value="{{ old('duracion_dias', 30) }}"
                                            class="form-input w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 h-12 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white"
                                            placeholder="30" />
                                        @error('duracion_dias') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                                    </label>
                                </div>
                            </div>
                        </details>

                        {{-- 3. HISTORIA --}}
                        <details class="flex flex-col rounded-xl border border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-800 px-6 py-2 group shadow-sm">
                            <summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none text-[#1c140d] dark:text-[#fcfaf8]">
                                <p class="text-lg font-bold">Historia y detalles</p>
                                <span class="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </summary>
                            
                            <div class="py-6 space-y-6 border-t border-gray-100 dark:border-gray-700 mt-2">
                                {{-- Descripción Completa --}}
                                <label class="flex flex-col">
                                    <p class="text-sm font-medium pb-2">Historia completa</p>
                                    <textarea name="descripcion" rows="8" required
                                        class="form-textarea w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white"
                                        placeholder="Cuenta todo sobre tu proyecto: ¿Quién eres? ¿Qué quieres crear?">{{ old('descripcion') }}</textarea>
                                     @error('descripcion') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                                </label>

                                {{-- Video URL --}}
                                <label class="flex flex-col">
                                    <p class="text-sm font-medium pb-2">Video (YouTube/Vimeo) - Opcional</p>
                                    <input name="video_url" type="url" value="{{ old('video_url') }}"
                                        class="form-input w-full rounded-xl border-[#E5E7EB] dark:border-[#374151] bg-[#FFFFFF] dark:bg-gray-700 h-12 p-3 focus:ring-[#F97316] focus:border-[#F97316] dark:text-white"
                                        placeholder="https://..." />
                                </label>
                            </div>
                        </details>
                    </div>

                    {{-- AVISO SOBRE RECOMPENSAS --}}
                    <div class="rounded-xl bg-orange-50 border border-orange-200 p-4 text-orange-800 text-sm dark:bg-orange-900/20 dark:border-orange-900/50 dark:text-orange-200">
                        <p class="font-bold flex items-center gap-2">
                            <span class="material-symbols-outlined">info</span>
                            Nota sobre recompensas
                        </p>
                        <p class="mt-1">
                            Podrás configurar las recompensas (Precios, envíos, etc.) en el siguiente paso, una vez hayas guardado el borrador.
                        </p>
                    </div>

                </div>

                {{-- COLUMNA DERECHA (VISTA PREVIA EN VIVO) --}}
                <div class="col-span-12 lg:col-span-4">
                    <div class="sticky top-24">
                        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Vista previa en vivo</h3>
                        
                        {{-- CARD START --}}
                        <div class="group flex w-full flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md dark:border-[#2a2017] dark:bg-[#1c140d]">
                            
                            {{-- Imagen --}}
                            <div class="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img id="card_image" 
                                     src="https://via.placeholder.com/640x360?text=Sube+tu+imagen" 
                                     alt="Portada del proyecto" 
                                     class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>

                            {{-- Contenido --}}
                            <div class="flex flex-1 flex-col p-5">
                                {{-- Categoría --}}
                                <div class="mb-3 flex items-center justify-between">
                                    <span id="card_category" class="text-xs font-bold uppercase tracking-wider text-[#f2780d]">
                                        Categoría
                                    </span>
                                    <span class="flex items-center text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                                        <span class="material-symbols-outlined mr-1 text-[16px]">schedule</span>
                                        <span id="card_days">30</span> días
                                    </span>
                                </div>

                                {{-- Título --}}
                                <h3 id="card_title" class="mb-2 text-xl font-bold leading-tight text-[#1c140d] dark:text-[#fcfaf8]">
                                    Título de tu proyecto
                                </h3>

                                {{-- Resumen --}}
                                <p id="card_resume" class="mb-4 line-clamp-2 text-sm text-[#6B7280] dark:text-[#a18a7a]">
                                    Aquí aparecerá el resumen breve de tu proyecto mientras escribes...
                                </p>

                                {{-- Barra de Progreso (Estática en 0% para creación) --}}
                                <div class="mt-auto pt-4">
                                    <div class="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f4ede7] dark:bg-[#2a2017]">
                                        <div class="h-full w-0 bg-[#f2780d]"></div>
                                    </div>
                                    <div class="flex items-end justify-between">
                                        <div class="flex flex-col">
                                            <span class="text-base font-bold text-[#1c140d] dark:text-[#fcfaf8]">0 €</span>
                                            <span class="text-xs text-[#6B7280] dark:text-[#9CA3AF]">recaudados</span>
                                        </div>
                                        <div class="flex flex-col items-end">
                                            <span class="text-sm font-bold text-[#6B7280] dark:text-[#9CA3AF]">0%</span>
                                            {{-- Objetivo Dinámico --}}
                                            <span class="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                                                meta: <span id="card_goal">10.000</span> €
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {{-- Footer del Autor --}}
                                <div class="mt-4 flex items-center gap-2 border-t border-[#f4ede7] pt-4 dark:border-[#2a2017]">
                                    <div class="h-6 w-6 rounded-full bg-[#f2780d]/20 flex items-center justify-center text-[10px] font-bold text-[#f2780d] uppercase">
                                        {{ substr(Auth::user()->nombreUsuario, 0, 1) }}
                                    </div>
                                    <span class="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                                        por <span class="text-[#1c140d] dark:text-[#fcfaf8] font-bold">{{ Auth::user()->nombreUsuario }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {{-- CARD END --}}

                        <p class="text-xs text-gray-400 mt-4 text-center">
                            Así verán los mecenas tu proyecto en la página principal.
                        </p>
                    </div>
                </div>

            </div>
        </form>
    </div>

    {{-- SCRIPT PARA LA VISTA PREVIA --}}
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // ELEMENTOS INPUTS
            const inTitulo = document.getElementById('input_titulo');
            const inResumen = document.getElementById('input_resumen');
            const inCategoria = document.getElementById('input_categoria');
            const inObjetivo = document.getElementById('input_objetivo');
            const inDias = document.getElementById('input_dias');
            const inImagen = document.getElementById('imagen_portada');

            // ELEMENTOS TARJETA
            const cardTitle = document.getElementById('card_title');
            const cardResume = document.getElementById('card_resume');
            const cardCategory = document.getElementById('card_category');
            const cardGoal = document.getElementById('card_goal');
            const cardDays = document.getElementById('card_days');
            const cardImage = document.getElementById('card_image');

            // EVENT LISTENERS
            
            // 1. Título
            if(inTitulo) {
                inTitulo.addEventListener('input', (e) => {
                    cardTitle.textContent = e.target.value || 'Título de tu proyecto';
                });
            }

            // 2. Resumen
            if(inResumen) {
                inResumen.addEventListener('input', (e) => {
                    cardResume.textContent = e.target.value || 'Aquí aparecerá el resumen breve de tu proyecto mientras escribes...';
                });
            }

            // 3. Objetivo (Formato Moneda)
            if(inObjetivo) {
                inObjetivo.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    if(!isNaN(val)) {
                        cardGoal.textContent = val.toLocaleString('es-ES');
                    } else {
                        cardGoal.textContent = '0';
                    }
                });
            }

            // 4. Días
            if(inDias) {
                inDias.addEventListener('input', (e) => {
                    cardDays.textContent = e.target.value || '30';
                });
            }

            // 5. Categoría (Texto del Select)
            if(inCategoria) {
                inCategoria.addEventListener('change', (e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    cardCategory.textContent = selectedOption.text;
                });
            }

            // 6. Imagen (FileReader)
            if(inImagen) {
                inImagen.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(evt) {
                            cardImage.src = evt.target.result;
                        }
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    </script>
</x-layouts.body>