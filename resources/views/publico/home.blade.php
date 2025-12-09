<x-layouts.body>
    <!-- Hero: Banner Principal -->
    <section class="relative isolate overflow-hidden rounded-2xl my-8 h-[520px] sm:h-[560px] md:h-[600px]">
        <video autoplay muted loop playsinline
            class="absolute left-1/2 top-1/2 h-[135%] w-[150%] -translate-x-1/2 -translate-y-1/2 object-cover rounded-2xl">
            <source src="media/cinematica.mp4" type="video/mp4" />
            Tu navegador no soporta el vídeo.
        </video>

        <div class="absolute inset-0 bg-black/40 rounded-2xl"></div>

        <!-- Contenido -->
        <div class="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center text-white">
            <h1 class="mt-3 text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                Financia sueños. Crea impacto
            </h1>
            <p class="mx-auto mt-5 max-w-2xl text-sm sm:text-base opacity-90">
                Únete a una comunidad dedicada a impulsar el futuro. Descubre proyectos innovadores o lanza
                tu campaña hoy.
            </p>

            <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="{{ route('proyectos') }}"
                    class="inline-flex h-11 items-center justify-center rounded-lg bg-orange-500 px-6 text-sm font-bold text-white transition hover:bg-orange-600">
                    Descubrir Proyectos
                </a>
                <a href="{{ route('proyectos.store') }}"
                    class="inline-flex h-11 items-center justify-center rounded-lg bg-white/90 px-6 text-sm font-bold text-gray-900 hover:bg-white">
                    Crea tu Proyecto
                </a>
            </div>
        </div>
    </section>

    <hr class="my-20 border-t border-gray-300/70 dark:border-gray-700/40">

    <section class="py-12 bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-black text-center mb-10 text-[#1c140d] dark:text-[#fcfaf8]">
                Top proyectos del mes
            </h2>

            {{-- AQUÍ ESTÁ LA CLAVE: grid-cols-1 para móvil, grid-cols-3 para escritorio --}}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                
                @forelse($proyectos as $proyecto)
                    <x-cards.proyecto_card :proyecto="$proyecto" />
                @empty
                    <p class="col-span-3 text-center text-gray-500">No hay proyectos destacados aún.</p>
                @endforelse

            </div>
        </div>
    </section>

    <hr class="my-20 border-t border-gray-300/70 dark:border-gray-700/40">

    <section>
        <div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-10 sm:p-14 shadow-sm">
            <h2 class="text-center text-3xl font-bold leading-tight tracking-tight">
                Historias de éxito de Rise Together
            </h2>
            <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                <x-cards.exito />
                <x-cards.exito />
                <x-cards.exito />

            </div>
        </div>
    </section>

    <hr class="my-20 border-t border-gray-300/70 dark:border-gray-700/40">

    <section>
        <div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-10 sm:p-14 shadow-sm">
            <h2 class="text-center text-3xl font-bold leading-tight tracking-tight">
                Relevantes de la comunidad
            </h2>
            <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                <x-cards.comentario />
                <x-cards.comentario />
                <x-cards.comentario />

            </div>
        </div>
    </section>

    <hr class="my-20 border-t border-gray-300/70 dark:border-gray-700/40">

    <x-home.formulario-feedback />

</x-layouts.body>