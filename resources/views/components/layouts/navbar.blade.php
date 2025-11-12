<!-- TopNavBar -->
<header
    class="sticky top-0 z-50 border-b border-subtle-light/80 bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:border-subtle-dark/80 dark:bg-background-dark/80 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between" aria-label="Primary">
        <div class="flex items-center gap-8">
            <a href="#" class="flex items-center gap-3 text-text-light dark:text-text-dark">
                <img src="img/logo.png" alt="Rise Together" class="max-h-24 w-auto object-contain">
            </a>
        </div>
        <div class="w-full flex justify-center">
            <label class="relative w-full max-w-md ">
                <span
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark">search</span>
                <input type="search" placeholder="Buscar proyectos..."
                    class="w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400" />
            </label>
        </div>
        <div class="flex flex-1 items-center justify-end gap-2">
            <div class="hidden flex-1 items-center justify-end gap-2 md:flex">
                <button type="button"
                    class="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-subtle-light px-4 text-sm font-bold text-text-light transition-colors hover:bg-subtle-light/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:bg-subtle-dark dark:text-text-dark dark:hover:bg-subtle-dark/80 dark:focus-visible:ring-offset-background-dark">
                    Iniciar Sesión
                </button>
                <button type="button"
                    class="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark">
                    Crear Proyecto
                </button>
            </div>

            <button type="button"
                class="md:hidden flex h-10 items-center justify-center gap-2 rounded-lg bg-subtle-light px-2.5 text-sm font-bold text-text-light dark:bg-subtle-dark dark:text-text-dark">
                <span class="material-symbols-outlined text-2xl" aria-hidden="true">menu</span>
                <span class="sr-only">Abrir Menú</span>
            </button>
        </div>
    </nav>

    <!-- Categorias -->
    <nav class="mt-3 hidden md:block" aria-label="Categorías">
        <ul class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[17px] font-medium mt-5">
            <li><a href="#" class="hover:text-primary">Arte</a></li>
            <li><a href="#" class="hover:text-primary">Cómics</a></li>
            <li><a href="#" class="hover:text-primary">Artesanías</a></li>
            <li><a href="#" class="hover:text-primary">Danza</a></li>
            <li><a href="#" class="hover:text-primary">Diseño</a></li>
            <li><a href="#" class="hover:text-primary">Moda</a></li>
            <li><a href="#" class="hover:text-primary">Cine</a></li>
            <li><a href="#" class="hover:text-primary">Comida</a></li>
            <li><a href="#" class="hover:text-primary">Juegos</a></li>
            <li><a href="#" class="hover:text-primary">Periodismo</a></li>
            <li><a href="#" class="hover:text-primary">Música</a></li>
            <li><a href="#" class="hover:text-primary">Fotografía</a></li>
            <li><a href="#" class="hover:text-primary">Publicaciones</a></li>
            <li><a href="#" class="hover:text-primary">Tecnología</a></li>
            <li><a href="#" class="hover:text-primary">Teatro</a></li>
        </ul>
    </nav>
</header>