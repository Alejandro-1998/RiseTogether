<x-layouts.body>

    <section class="relative isolate">
        <div class="pointer-events-none absolute inset-0 -z-10">
            <div class="mx-auto max-w-5xl h-72 rounded-4xl bg-[#f4ede7]/70 dark:bg-[#2a2017]/50 blur-0">
            </div>
        </div>

        <div
            class="mx-auto grid max-w-5xl gap-0 overflow-hidden rounded-2xl border border-[#f4ede7] bg-white shadow-sm dark:border-[#2a2017] dark:bg-[#2a2017] md:grid-cols-2">

            <x-login_registro.formulario-loginRegistro />

            <x-login_registro.video-loginRegistro />

        </div>
    </section>

</x-layouts.body>