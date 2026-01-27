<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Rise Together</title>
        <link rel="icon" href="/img/icono.png" type="image/png">
        <!-- Google Fonts: Material Symbols Outlined -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/riseTogether/index.jsx'])
        <script>
            window.Laravel = {
                assetUrl: "{{ asset('') }}"
            };
        </script>
    </head>
    <body >
        <div id='root'></div>
    </body>
</html>