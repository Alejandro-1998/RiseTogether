<x-layouts.body>

    <div class="px-4 sm:px-6 lg:px-8 flex flex-1 justify-center py-5">
        <div class="flex flex-col w-full max-w-7xl flex-1">
            <section class="flex flex-col gap-4 p-4">
                <div class="flex flex-col gap-2">
                    <h1
                        class="text-4xl font-black leading-tight tracking-[-0.033em] text-[#1c140d] dark:text-[#F3F4F6]">
                        Descubre proyectos inspiradores</h1>
                    <p
                        class="text-base font-normal leading-normal text-[#9c7049] dark:text-[#9CA3AF]">
                        Encuentra y financia la próxima generación de ideas creativas e innovadoras.</p>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div class="flex gap-2 flex-wrap">
                        <button
                            class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#fcfaf8] dark:bg-[#1F2937] px-4 text-sm font-medium hover:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30 transition-colors">Tendencia
                        </button>
                        <button
                            class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#fcfaf8] dark:bg-[#1F2937] px-4 text-sm font-medium hover:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30 transition-colors">Novedades
                        </button>
                        <button
                            class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#fcfaf8] dark:bg-[#1F2937] px-4 text-sm font-medium hover:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30 transition-colors">A un paso de hacerse realidad
                        </button>
                    </div>
                    <button
                        class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#fcfaf8] dark:bg-[#1F2937] pl-4 pr-3 text-sm font-medium hover:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30 transition-colors">
                        <span>Ordenar por: Los más financiados</span>
                        <span class="material-symbols-outlined text-base">expand_more</span>
                    </button>
                </div>
            </section>
            <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">

                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                <x-cards.proyecto />
                
            </section>

            <x-layouts.paginacion />

        </div>
    </div>

</x-layouts.body>