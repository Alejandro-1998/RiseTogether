<!-- Ton Navbar -->
<header
    class="sticky top-0 z-50 border-b border-[#f4ede7]/80 bg-[#fcfaf8]/80 px-4 py-3 backdrop-blur-sm dark:border-[#2a2017]/80 dark:bg-[#1c140d]/80 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between" aria-label="Primary">

        @if (!Route::is('login') && !Route::is('registro'))
            <div class="flex items-center gap-8">
                <a href="{{ route('home') }}" class="flex items-center gap-3 text-[#1c140d] dark:text-[#fcfaf8]">
                    <img src="img/logo.png" alt="Rise Together" class="max-h-24 w-auto object-contain">
                </a>
            </div>

            <div class="w-full flex justify-center">
                <label class="relative w-full max-w-md ">
                    <span
                        class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">search</span>
                    <input type="search" placeholder="Buscar proyectos..."
                        class="w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400" />
                </label>
            </div>
        @else
            <div class="flex items-center gap-8">
                <a href="{{ route('home') }}" class="flex items-center gap-3 text-[#1c140d] dark:text-[#fcfaf8]">
                    <img src="img/logo.png" alt="Rise Together" class="max-h-14.5 w-auto object-contain">
                </a>
            </div>
        @endif

        <div class="flex flex-1 items-center justify-end gap-2">
            <div class="hidden flex-1 items-center justify-end gap-2 md:flex">

                @if (!Route::is('login') && !Route::is('registro'))
                    <a href="{{ route('login') }}"
                        class="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#2a2017]/80 dark:focus-visible:ring-offset-[#1c140d]">
                        Iniciar Sesión
                    </a>
                    <a  href="{{ route('crear_proyecto') }}"
                        class="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:focus-visible:ring-offset-[#1c140d]">
                        Crear Proyecto
                    </a>
                @elseif (Route::is('login'))
                    <a href="{{ route('home') }}"
                        class="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#2a2017]/80 dark:focus-visible:ring-offset-[#1c140d]">
                        Volver a Inicio
                    </a>
                    <a href="{{ route('registro') }}"
                        class="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:focus-visible:ring-offset-[#1c140d]">
                        Registrarse
                    </a>
                @else
                    <a href="{{ route('home') }}"
                        class="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#2a2017]/80 dark:focus-visible:ring-offset-[#1c140d]">
                        Volver a Inicio
                    </a>
                    <a href="{{ route('login') }}"
                        class="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:focus-visible:ring-offset-[#1c140d]">
                        Iniciar Sesión
                    </a>
                @endif
            </div>

            <button type="button"
                class="md:hidden flex h-10 items-center justify-center gap-2 rounded-lg bg-[#f4ede7] px-2.5 text-sm font-bold text-[#1c140d] dark:bg-[#2a2017] dark:text-[#fcfaf8]">
                <span class="material-symbols-outlined text-2xl" aria-hidden="true">menu</span>
                <span class="sr-only">Abrir Menú</span>
            </button>
        </div>
    </nav>

    @if (!Route::is('login') && !Route::is('registro'))
        <nav class="mt-3 hidden md:block" aria-label="Categorías">
            <ul class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[17px] font-medium mt-5">
                <li><a href="#" class="hover:text-[#f2780d]">Arte</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Cómics</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Artesanías</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Danza</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Diseño</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Moda</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Cine</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Comida</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Juegos</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Periodismo</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Música</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Fotografía</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Publicaciones</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Tecnología</a></li>
                <li><a href="#" class="hover:text-[#f2780d]">Teatro</a></li>
            </ul>
        </nav>
    @endif
</header>