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

    <!-- Tailwind config  -->
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#f2780d",
                        "background-light": "#fcfaf8",
                        "background-dark": "#1c140d",
                        "text-light": "#1c140d",
                        "text-dark": "#fcfaf8",
                        "subtle-light": "#f4ede7",
                        "subtle-dark": "#2a2017",
                        "muted-light": "#9c7049",
                        "muted-dark": "#a18a7a"
                    },
                    fontFamily: { display: ["Inter", "sans-serif"] },
                    borderRadius: { DEFAULT: "0.5rem", lg: "1rem", xl: "1.5rem", full: "9999px" }
                }
            }
        }
    </script>
</head>
<body class="font-display bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div class="flex h-full grow flex-col">

            <x-layouts.navbar />

            <main class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-6">
                {{ $slot }}
            </main>

            <x-layouts.footer />

        </div>
    </div>
</body>
</html>