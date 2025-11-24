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

                            <div
                                class="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all">
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">10 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Aportación de apoyo</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Si te gusta el proyecto pero no puedes asumir el juego completo, esta es tu opción.
                                    Aparecerás en los agradecimientos digitales.
                                </p>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white text-sm font-bold hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20 transition-colors">
                                    Seleccionar esta recompensa
                                </button>
                            </div>

                            <div
                                class="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all">
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">25 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Pack digital</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Libro de reglas en PDF, pack de arte digital, tapete virtual y versión print & play
                                    básica para probar el juego antes de recibirlo.
                                </p>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white text-sm font-bold hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20 transition-colors">
                                    Seleccionar esta recompensa
                                </button>
                            </div>

                            <div
                                class="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all">
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">40 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Edición estándar</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Una copia física de Legendas de Aetheria en su edición estándar.
                                    Incluye todos los componentes necesarios para jugar.
                                </p>
                                <div class="mt-3 text-xs text-[#9c7049] dark:text-[#9c7049]/80">
                                    <span class="font-bold">ENTREGA ESTIMADA:</span> Ene 2026
                                </div>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white text-sm font-bold hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20 transition-colors">
                                    Seleccionar esta recompensa
                                </button>
                            </div>

                            <div class="rounded-2xl border-2 border-[#f2780d] p-5 relative shadow-lg">
                                <div
                                    class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f2780d] text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Más popular
                                </div>
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">55 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Legendas de Aetheria - Early
                                    Bird</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Copia física del juego base a precio reducido para los primeros mecenas.
                                    Incluye todos los objetivos desbloqueados durante la campaña.
                                </p>
                                <div class="mt-3 text-xs text-[#9c7049] dark:text-[#9c7049]/80">
                                    <span class="font-bold">ENTREGA ESTIMADA:</span> Dic 2025
                                </div>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f2780d] text-white font-bold hover:bg-[#f2780d]/90 transition-colors">
                                    Seleccionar esta recompensa
                                </button>
                            </div>

                            <div
                                class="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all">
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">70 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Edición Deluxe</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Componentes mejorados: cartas con acabado lino, marcadores de madera y ficha de
                                    jugador inicial exclusiva.
                                </p>
                                <div class="mt-3 text-xs text-[#9c7049] dark:text-[#9c7049]/80">
                                    <span class="font-bold">ENTREGA ESTIMADA:</span> Feb 2026
                                </div>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white text-sm font-bold hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20 transition-colors">
                                    Seleccionar esta recompensa
                                </button>
                            </div>

                            <div class="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 opacity-50">
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">95 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Edición coleccionista
                                    (agotada)</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Incluye el juego base, miniaturas exclusivas, arte alternativo y caja con acabado
                                    especial numerada.
                                </p>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#9c7049] dark:text-[#9c7049]/80 font-bold"
                                    disabled>
                                    Agotado
                                </button>
                            </div>

                            <div
                                class="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all">
                                <p class="text-2xl font-bold text-[#1c140d] dark:text-white">120 €</p>
                                <p class="mt-1 font-bold text-[#1c140d] dark:text-white">Pack tiendas / clubes</p>
                                <p class="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                    Pensado para asociaciones y tiendas: 3 copias del juego con condiciones especiales
                                    para demostraciones y eventos.
                                </p>
                                <div class="mt-3 text-xs text-[#9c7049] dark:text-[#9c7049]/80">
                                    <span class="font-bold">ENTREGA ESTIMADA:</span> Mar 2026
                                </div>
                                <button
                                    class="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white text-sm font-bold hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20 transition-colors">
                                    Seleccionar esta recompensa
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
</x-layouts.body>
