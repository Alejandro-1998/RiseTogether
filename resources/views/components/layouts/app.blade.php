<!DOCTYPE html>
<html class="light" lang="es">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta name="author" content="Alejandro Caballero Luque" />
    <meta name="author" content="Rafael de la Fuente López" />
    <meta name="author" content="Santiago Cantero Torrents" />
    <meta name="author" content="Juan Bautista Galisteo Marqués" />
    <title>Rise Together - Apoya, Crea, Crece</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <link href="/dist/styles.css" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24
        }
    </style>

    </head>
<body class="font-display bg-[#fcfaf8] text-[#1c140d] dark:bg-[#1c140d] dark:text-[#fcfaf8]">
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div class="flex h-full grow flex-col">

            <x-layouts.navbar />

            <main class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-6">
                {{ $slot }}
            </main>

            @if (!Route::is('login') && !Route::is('registro'))
                <x-layouts.footer />
            @endif

        </div>
    </div>
</body>
</html>