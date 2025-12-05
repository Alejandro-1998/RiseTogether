<x-layouts.body>


    <div class="flex flex-col w-full max-w-7xl">
        <div class="relative mb-20">
            <div class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[280px] shadow-sm"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBy9Wss6EBRoR7h3QbFmEUvv8yYqAkAHJvQHJolGdmXUU6eXj62XpZQgfUVzCZc_WAkapFJSxbovCIb8D6h1bJuSDKxqfJ4V_yk2h8nqIHtI9nLhgyOcT53RH09ZVWxNLRGtdS2oSMEiBHj80gbB_GA0-YUwB0eHspnjYbceQyZkw4youOQoQbZVoFUDclCl2oYNu4YiR7rSoGVBeJ_qZmW7JTnrRzGW1VoYcG0_ujIk9svn-s5mIUa7t86AR_qaPxqgKf3BmSvolw");'>
                <span class="sr-only">Banner abstracto con degradados naranjas y azules</span>
            </div>

            <div class="absolute -bottom-20 left-4 sm:left-8 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
                <div class="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
                    <div class="flex gap-4">
                        <div class="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 sm:min-h-32 sm:w-32 border-4 border-[#fcfaf8] dark:border-[#1a1a1a]"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAwEbSTOFIZFktpB4uQ9wkgVgm1FHWTJGJlmEo1BAQcRlSTEAO0PgIU5vdw-gEqAAVE-_pXNfGYGtBW1aCjUlYkMFRwkyEWJrATqoTqeQpkcl2BtOUklo_9cDlw7Hok_IuK-_FHaGGSBBrU9zUIeyy4qILrxeJIbhQst1dCo39DWRzQd7DubZdv9otAhmsJQfjsWtZ-aDvEBMjKIKcOoP0t6iEW_vpEXt2a-oOpZ4Hj7OmMw8Z-KhrlNBAyBLCKUlZEyW4Fyb-44dw");'>
                            <span class="sr-only">Foto de perfil de Alex Doe</span>
                        </div>
                        <div class="flex flex-col justify-center pt-8 sm:pt-0 sm:pb-2">
                            <p class="text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em]">
                                Alex Doe</p>
                            <p
                                class="text-[#6b7280] dark:text-[#9ca3af] text-sm sm:text-base font-normal leading-normal">
                                @alexdoe</p>
                            <p
                                class="text-[#6b7280] dark:text-[#9ca3af] text-sm sm:text-base font-normal leading-normal">
                                San Francisco, CA</p>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                            class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-10 px-6 bg-[#f2780d] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] sm:w-auto shadow-sm hover:opacity-90">
                            <span class="truncate">Seguir</span>
                        </button>
                        <button
                            class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-10 px-6 border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] text-sm font-medium leading-normal tracking-[0.015em] w-full max-w-[480px] sm:w-auto hover:bg-black/5 dark:hover:bg-white/5">
                            <span class="truncate">Enviar mensaje</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <section class="flex flex-wrap gap-3 py-3 mb-6" aria-label="Estadísticas del perfil">

            <x-cards.estadisticas_usuario />
            <x-cards.estadisticas_usuario />
            <x-cards.estadisticas_usuario />
            <x-cards.estadisticas_usuario />

        </section>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-8">
                <div class="border-b border-[#e8dace] dark:border-[#374151]">
                    <div class="flex gap-4 sm:gap-8 overflow-x-auto" role="tablist">
                        <button
                            class="flex flex-col items-center justify-center border-b-[3px] border-b-[#f2780d] shrink-0 pb-[13px] pt-4"
                            role="tab" aria-selected="true">
                            <p class="text-sm font-bold tracking-[0.015em]">Resumen</p>
                        </button>
                        <button
                            class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6b7280] dark:text-[#9ca3af] hover:border-b-[#f2780d]/50 hover:text-[#1a1a1a] dark:hover:text-[#f0f0f0] shrink-0 pb-[13px] pt-4"
                            role="tab">
                            <p class="text-sm font-bold tracking-[0.015em]">Proyectos creados</p>
                        </button>
                        <button
                            class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6b7280] dark:text-[#9ca3af] hover:border-b-[#f2780d]/50 hover:text-[#1a1a1a] dark:hover:text-[#f0f0f0] shrink-0 pb-[13px] pt-4"
                            role="tab">
                            <p class="text-sm font-bold tracking-[0.015em]">Proyectos apoyados</p>
                        </button>
                        <button
                            class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6b7280] dark:text-[#9ca3af] hover:border-b-[#f2780d]/50 hover:text-[#1a1a1a] dark:hover:text-[#f0f0f0] shrink-0 pb-[13px] pt-4"
                            role="tab">
                            <p class="text-sm font-bold tracking-[0.015em]">Actividad</p>
                        </button>
                        <button
                            class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6b7280] dark:text-[#9ca3af] hover:border-b-[#f2780d]/50 hover:text-[#1a1a1a] dark:hover:text-[#f0f0f0] shrink-0 pb-[13px] pt-4"
                            role="tab">
                            <p class="text-sm font-bold tracking-[0.015em]">Ajustes</p>
                        </button>
                    </div>
                </div>

                <section class="pt-8 space-y-8">
                    <div>
                        <h3 class="text-lg font-bold mb-4">Proyecto destacado</h3>
                        <article
                            class="flex flex-col overflow-hidden rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] shadow-sm">
                            <x-cards.proyecto_card />
                        </article>
                    </div>

                    <section aria-labelledby="actividad-reciente-titulo">
                        <div class="flex items-center justify-between mb-3">
                            <h3 id="actividad-reciente-titulo" class="text-lg font-bold">Actividad reciente
                            </h3>
                            <button class="text-xs text-[#f2780d] font-medium hover:underline">
                                Ver toda la actividad
                            </button>
                        </div>

                        <div
                            class="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">
                            <x-cards.actividad_reciente />
                            <x-cards.actividad_reciente />
                            <x-cards.actividad_reciente />
                            <x-cards.actividad_reciente />
                        </div>
                    </section>
                </section>
            </div>

            <aside class="lg:col-span-4 flex flex-col gap-8">
                <section
                    class="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-3">Sobre mí</h3>
                    <p class="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed">
                        Diseñador de producto y entusiasta de la tecnología. Me apasiona crear soluciones
                        que resuelvan problemas reales
                        y apoyar proyectos innovadores. Creo que las buenas ideas crecen cuando se
                        construyen en comunidad.
                    </p>
                </section>

                <section
                    class="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-4">Información básica</h3>
                    <dl class="space-y-3 text-sm">
                        <div class="flex justify-between gap-4">
                            <dt class="text-[#6b7280] dark:text-[#9ca3af]">Ubicación
                            </dt>
                            <dd class="font-medium text-right">San Francisco, CA</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-[#6b7280] dark:text-[#9ca3af]">Miembro
                                desde</dt>
                            <dd class="font-medium text-right">enero 2024</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-[#6b7280] dark:text-[#9ca3af]">Rol
                                principal</dt>
                            <dd class="font-medium text-right">Creador y mecenas</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-[#6b7280] dark:text-[#9ca3af]">Idiomas</dt>
                            <dd class="font-medium text-right">Español, Inglés</dd>
                        </div>
                    </dl>
                </section>

                <section
                    class="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-4">En la web</h3>
                    <div class="flex gap-4">
                        <a class="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d]" href="#"
                            aria-label="Perfil en Facebook">
                            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path clip-rule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a class="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d]" href="#"
                            aria-label="Perfil en Twitter">
                            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                </path>
                            </svg>
                        </a>
                        <a class="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#f2780d]" href="#"
                            aria-label="Perfil en GitHub">
                            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path clip-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.477 2 12.019c0 4.434 2.733 8.217 6.57 9.539.49.09.66-.213.66-.473 0-.234-.01-1.044-.015-2.043-2.65.576-3.2-1.12-3.2-1.12-.446-1.135-1.09-1.438-1.09-1.438-.89-.608.07-.596.07-.596.98.068 1.495 1.008 1.495 1.008.87 1.492 2.285 1.06 2.84.81.09-.63.34-1.06.615-1.305-2.168-.248-4.445-1.085-4.445-4.832 0-1.068.38-1.942 1.01-2.626-.1-.25-.44-1.24.1-2.588 0 0 .82-.263 2.68 1.002.78-.216 1.61-.324 2.44-.328.83.004 1.66.112 2.44.328 1.86-1.265 2.68-1.002 2.68-1.002.54 1.347.2 2.338.1 2.588.63.684 1.01 1.558 1.01 2.626 0 3.758-2.28 4.58-4.45 4.822.35.308.66.92.66 1.852 0 1.336-.01 2.415-.01 2.742 0 .26.17.566.66.472A10.007 10.007 0 0022 12.019C22 6.477 17.523 2 12 2z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </section>

                <section
                    class="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-4">Intereses</h3>
                    <div class="flex flex-wrap gap-2 text-xs">
                        <span
                            class="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
                            Tecnología sostenible
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
                            Diseño de producto
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
                            IoT & domótica
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
                            Huertos urbanos
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border border-[#e8dace] dark:border-[#374151] px-3 py-1">
                            Emprendimiento
                        </span>
                    </div>
                </section>

                <section
                    class="rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-[#ffffff] dark:bg-[#2d2d2d] p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-4">Categorías que más apoya</h3>
                    <div class="space-y-4">
                        <div>
                            <p class="text-sm font-medium mb-1">Tecnología</p>
                            <div class="bg-black/10 dark:bg-white/10 w-full rounded-full h-2">
                                <div class="bg-[#f2780d] h-2 rounded-full" style="width: 85%"></div>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-medium mb-1">Diseño y arte</p>
                            <div class="bg-black/10 dark:bg-white/10 w-full rounded-full h-2">
                                <div class="bg-[#f2780d] h-2 rounded-full" style="width: 60%"></div>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-medium mb-1">Juegos</p>
                            <div class="bg-black/10 dark:bg-white/10 w-full rounded-full h-2">
                                <div class="bg-[#f2780d] h-2 rounded-full" style="width: 40%"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </div>


</x-layouts.body>
