@props(['proyecto'])

<div class="flex flex-col gap-4 rounded-xl bg-[#fcfaf8] dark:bg-[#1F2937] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group h-full">
    
    {{-- 1. IMAGEN DINÁMICA --}}
    {{-- Si hay imagen en BD la usa, si no, usa una por defecto --}}
    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover"
        style="background-image:url('{{ $proyecto->imagen_portada ? Storage::url($proyecto->imagen_portada) : asset('img/default-project.png') }}');">
    </div>

    <div class="flex flex-col gap-4 px-4 flex-1">
        <div class="flex flex-col gap-1">
            
            {{-- 2. CATEGORÍA Y TÍTULO --}}
            <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold text-[#f2780d] uppercase tracking-wider">
                    {{ $proyecto->categoria->nombre ?? 'General' }}
                </span>
            </div>
            
            <h3 class="text-base font-bold leading-normal text-[#1c140d] dark:text-[#F3F4F6] line-clamp-1" title="{{ $proyecto->titulo }}">
                {{ $proyecto->titulo }}
            </h3>

            {{-- 3. RESUMEN --}}
            <p class="text-sm font-normal leading-normal text-[#9c7049] dark:text-[#9CA3AF] line-clamp-3">
                {{ $proyecto->resumen }}
            </p>
        </div>

        {{-- 4. BARRA DE PROGRESO --}}
        {{-- Calculamos el porcentaje, limitando la barra visual al 100% --}}
        @php
            $porcentaje = $proyecto->porcentaje_financiado; // Usamos el atributo que creamos en el Modelo
            $anchoBarra = min($porcentaje, 100);
            
            // Calculamos días restantes
            $diasRestantes = now()->diffInDays($proyecto->fecha_limite, false);
            $esExpirado = $diasRestantes < 0;
        @endphp

        <div class="mt-auto">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                <div class="bg-[#f2780d] h-2 rounded-full transition-all duration-1000" style="width: {{ $anchoBarra }}%"></div>
            </div>

            {{-- 5. ESTADÍSTICAS --}}
            <div class="flex justify-between text-xs font-medium text-[#9c7049] dark:text-[#9CA3AF]">
                <span>{{ number_format($proyecto->cantidad_recaudada, 0, ',', '.') }} €</span>
                <span class="{{ $porcentaje >= 100 ? 'text-green-500 font-bold' : '' }}">
                    {{ number_format($porcentaje, 0) }}%
                </span>
                <span>
                    @if($esExpirado)
                        Finalizado
                    @else
                        {{ round($diasRestantes) }} días
                    @endif
                </span>
            </div>
        </div>
    </div>

    {{-- 6. BOTÓN / ENLACE --}}
    <div class="px-4 pb-4">
        @if (!Route::is('crear_proyecto'))
            {{-- Asumiendo que crearás una ruta para ver el detalle con el slug --}}
            {{-- href="{{ route('proyectos.show', $proyecto->slug) }}" --}}
            <a href="{{ route('proyecto') }}" 
                class="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f2780d]/20 dark:bg-[#f2780d]/30 text-[#f2780d] text-sm font-bold group-hover:bg-[#f2780d] group-hover:text-white dark:group-hover:text-[#F3F4F6] transition-colors duration-300">
                Ver proyecto
            </a>
        @endif
    </div>
</div>