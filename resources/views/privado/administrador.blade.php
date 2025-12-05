<x-layouts.body title="Dashboard - Administración">

    <div class="flex flex-wrap justify-between gap-3 mb-6">
        <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Panel de administración
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <x-admin.stats title="Proyectos activos" value="1.245" trend="+2,5 % vs mes anterior" />
        <x-admin.stats title="Pendientes de revisión" value="86" trend="+1,8 % vs mes anterior" />
        <x-admin.stats title="Usuarios registrados" value="15.302" trend="+5,1 % vs mes anterior" />
        <x-admin.stats title="Ingresos este mes" value="75.942 €" trend="-0,5 % vs mes anterior"
            trendColor="text-red-600 dark:text-red-500" />
    </div>

    <div class="grid grid-cols-3 gap-8 items-stretch">

        <div class="col-span-3 lg:col-span-3">
            <h2 class="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                Proyectos pendientes</h2>
            <div
                class="overflow-x-auto bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl">
                <table class="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead class="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="px-6 py-3" scope="col">Nombre del proyecto</th>
                            <th class="px-6 py-3" scope="col">Creador</th>
                            <th class="px-6 py-3" scope="col">Categoría</th>
                            <th class="px-6 py-3" scope="col">Cantidad recaudada</th>
                            <th class="px-6 py-3" scope="col">Estado</th>
                            <th class="px-6 py-3" scope="col">Fecha de envío</th>
                            <th class="px-6 py-3 text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        <x-admin.proyecto_pendiente />
                        <x-admin.proyecto_pendiente />
                        <x-admin.proyecto_pendiente />
                        <x-admin.proyecto_pendiente />

                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-span-3 lg:col-span-1 h-full">
            <h2 class="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                Actividad reciente</h2>
            <div
                class="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-6">

                <x-cards.actividad_reciente />
                <x-cards.actividad_reciente />
                <x-cards.actividad_reciente />
                <x-cards.actividad_reciente />


            </div>
        </div>

        <div class="col-span-3 lg:col-span-2 h-full">
            <h2 class="text-gray-800 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">
                Revisión de comentarios
            </h2>
            <div
                class="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-4">
                <p class="text-sm text-gray-600 dark:text-gray-300">
                    Comentarios ocultados automáticamente por contener palabras bloqueadas.
                    Revisa cada caso antes de restaurarlo o eliminarlo definitivamente.
                </p>

                <div class="overflow-x-auto">
                    <table class="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
                        <thead class="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th class="px-4 py-3">Proyecto</th>
                                <th class="px-4 py-3">Usuario</th>
                                <th class="px-4 py-3">Motivo</th>
                                <th class="px-4 py-3">Fecha</th>
                                <th class="px-4 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            <x-admin.revision_comentario />
                            <x-admin.revision_comentario />
                            <x-admin.revision_comentario />
                            <x-admin.revision_comentario />

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</x-layouts.body>
