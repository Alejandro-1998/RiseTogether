<x-layouts.body>
<div class="layout-content-container flex flex-col w-full max-w-7xl px-4 sm:px-8 md:px-10">
        <div class="flex flex-wrap justify-center gap-3 p-4">
            <div class="flex min-w-72 flex-col gap-2 items-center text-center">
                <p
                    class="text-[#1c140d] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                    Leyendas de Aetheria
                </p>
                <p class="text-[#9c7049] dark:text-[#9c7049]/80 text-base font-normal leading-normal">
                    Por creadores independientes
                </p>
            </div>
        </div>

        <x-proyecto.portada />

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
                    <div class="lg:col-span-2">
                        <div class="border-b border-[#f4ede7] dark:border-[#f4ede7]/10">
                            <nav aria-label="Tabs" class="flex space-x-6">
                                <a class="shrink-0 border-b-2 border-[#f2780d] px-1 pb-3 text-sm font-bold text-[#f2780d]"
                                    href="#">Historia</a>
                                <a class="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[#9c7049] dark:text-[#9c7049]/80 hover:border-[#f4ede7] dark:hover:border-[#f4ede7]/20 hover:text-[#1c140d] dark:hover:text-white"
                                    href="#">
                                    Actualizaciones
                                    <span
                                        class="bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#9c7049] dark:text-[#9c7049]/80 ml-1 rounded-full px-2 py-0.5 text-xs">5</span>
                                </a>
                                <a class="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[#9c7049] dark:text-[#9c7049]/80 hover:border-[#f4ede7] dark:hover:border-[#f4ede7]/20 hover:text-[#1c140d] dark:hover:text-white"
                                    href="#">FAQ</a>
                                <a class="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[#9c7049] dark:text-[#9c7049]/80 hover:border-[#f4ede7] dark:hover:border-[#f4ede7]/20 hover:text-[#1c140d] dark:hover:text-white"
                                    href="#">
                                    Comentarios
                                    <span
                                        class="bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#9c7049] dark:text-[#9c7049]/80 ml-1 rounded-full px-2 py-0.5 text-xs">128</span>
                                </a>
                            </nav>
                        </div>

                        <div
                            class="prose prose-lg dark:prose-invert max-w-none text-[#1c140d] dark:text-gray-300 mt-8 space-y-6">
                            <h3 class="text-2xl font-bold text-[#1c140d] dark:text-white">Construye tu reino en el mundo
                                de Aetheria.</h3>
                            <p>
                                <strong>Leyendas de Aetheria</strong> es un juego de mesa estratégico donde cada jugador
                                construye su propio
                                reino mediante cartas, recursos y alianzas. Con un diseño cuidado y mecánicas únicas,
                                invita a combinar
                                táctica y creatividad en cada partida.
                            </p>
                            <p>
                                A lo largo de la partida desarrollarás territorios, forjarás pactos con facciones
                                mágicas y decidirás si
                                prefieres avanzar mediante diplomacia, poder militar o dominio de la magia. Ninguna
                                partida será igual a la
                                anterior gracias a la gran variedad de cartas y combinaciones posibles.
                            </p>

                            <figure>
                                <img alt="Diagrama del contenido de la caja y los componentes de Legendas de Aetheria."
                                    class="rounded-3xl"
                                    src="{{ asset('img/juego.png') }}" />
                                <figcaption
                                    class="text-center text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-2">
                                    Tablero modular, cartas de reino y componentes diseñados para una experiencia
                                    inmersiva.
                                </figcaption>
                            </figure>

                            <h3 class="text-2xl font-bold text-[#1c140d] dark:text-white">Qué incluye tu aportación</h3>
                            <p>
                                Al apoyar este proyecto no solo haces posible la primera edición de <strong>Legendas de
                                    Aetheria</strong>,
                                sino que también ayudas a que más juegos de autor independiente lleguen a las mesas de
                                juego.
                                Con tu aportación recibirás:
                            </p>
                            <ul>
                                <li>Caja base de Legendas de Aetheria con tablero modular y todos los componentes.</li>
                                <li>Más de 200 cartas de reino, facciones, eventos y misiones.</li>
                                <li>Libro de reglas ilustrado y modo campaña con historia.</li>
                                <li>Todos los objetivos desbloqueados durante la campaña.</li>
                            </ul>

                            <h3 class="text-2xl font-bold text-[#1c140d] dark:text-white">Nuestra visión</h3>
                            <p>
                                Queremos crear un juego profundo, pero accesible, que pueda disfrutarse tanto en tardes
                                de
                                juego entre amigos como en sesiones más competitivas. El objetivo de esta campaña es
                                financiar la primera
                                tirada con <strong>materiales prémium</strong>: cartas de mayor gramaje, tablero de
                                grosor reforzado y
                                miniaturas de alta calidad.
                            </p>

                            <div
                                class="mt-12! rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 flex flex-col sm:flex-row items-start gap-6 not-prose">
                                <img alt="Retrato del equipo creador de Legendas de Aetheria."
                                    class="h-24 w-24 rounded-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ6jZq92wFd0BuPv2WPwUq0cRGfK2zgB5XRsiFST7zjLl0GoE0Vx8BSjMNztuHL4c9qWfRRzd4wacBQ_00pNQwqGimVRVe2NQTNO9WOTz0ltoHLPiavzN_6-Y_9-5EpbTRIbIrtFOxwpw22pleyPDEEqCquUizLtxDvNLugsrzEMfxYo8vyDtF9Fi4zL6A-6Pqv9Wbpgc8N9rxRI0HSr5i74oQRGArpRBFfLsrkA9Di5cHk3wJdO5CrDZvKWemJFd-Bz8hBcsE8YE" />
                                <div class="flex-1">
                                    <h4 class="text-xl font-bold text-[#1c140d] dark:text-white">Sobre los creadores
                                    </h4>
                                    <p class="text-base text-[#9c7049] dark:text-[#9c7049]/80 mt-1">
                                        Somos un pequeño equipo de diseñadores y jugadores apasionados por los juegos de
                                        mesa narrativos.
                                        Tras años probando prototipos en jornadas y clubes, queremos dar el salto a una
                                        edición profesional
                                        que mantenga el alma del proyecto pero con una producción a la altura.
                                    </p>
                                    <a class="text-[#f2780d] font-bold text-sm mt-3 inline-block" href="#">Ver otros
                                        proyectos</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-1">
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-[#1c140d] dark:text-white">Elige tu recompensa</h3>

                            <x-cards.recompensa />
                            <x-cards.recompensa />
                            <x-cards.recompensa />
                            <x-cards.recompensa />
                            <x-cards.recompensa />
                            <x-cards.recompensa />
                            <x-cards.recompensa />

                        </div>
                    </div>
                </div>
            </div>
</x-layouts.body>
