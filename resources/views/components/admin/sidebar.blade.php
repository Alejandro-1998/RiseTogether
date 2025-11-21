<aside class="w-64 shrink-0 bg-white dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full">
    <div class="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800 h-16">
        <div class="flex flex-col">
            <img src="{{ asset('img/logo.png') }}" alt="Rise Together" class="h-9 w-auto object-contain" />
        </div>
    </div>
    <nav class="flex-1 px-2 py-4 space-y-2">
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#f2780d]/20 text-[#f2780d]" href="#">
            <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1, 'wght' 500;">dashboard</span>
            <p class="text-sm font-medium leading-normal">Panel de administración</p>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" href="#">
            <span class="material-symbols-outlined text-2xl">folder_managed</span>
            <p class="text-sm font-medium leading-normal">Gestión de proyectos</p>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" href="#">
            <span class="material-symbols-outlined text-2xl">group</span>
            <p class="text-sm font-medium leading-normal">Usuarios</p>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" href="#">
            <span class="material-symbols-outlined text-2xl">sell</span>
            <p class="text-sm font-medium leading-normal">Categorías</p>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" href="#">
            <span class="material-symbols-outlined text-2xl">monitoring</span>
            <p class="text-sm font-medium leading-normal">Informes</p>
        </a>
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" href="#">
            <span class="material-symbols-outlined text-2xl">payments</span>
            <p class="text-sm font-medium leading-normal">Pagos y facturación</p>
        </a>
    </nav>
    
    <div class="px-2 py-4 mt-auto border-t border-gray-200 dark:border-gray-800 space-y-2">
        <a class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" href="#">
            <span class="material-symbols-outlined text-2xl">settings</span>
            <p class="text-sm font-medium leading-normal">Configuración del sistema</p>
        </a>
        <button type="submit" class="flex w-full items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <span class="material-symbols-outlined text-2xl">logout</span>
            <p class="text-sm font-medium leading-normal">Cerrar sesión</p>
        </button>
    </div>
</aside>