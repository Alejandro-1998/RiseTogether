{{-- Contenedor de Video --}}
<div class="hidden md:flex relative rounded-2xl overflow-hidden">
    <video autoplay loop muted playsinline
        class="absolute inset-0 h-full w-full object-cover">
        <source src="media/reunion.mp4" type="video/mp4" />
        Tu navegador no soporta el vídeo.
    </video>
    
    {{-- Overlay y Contenido encima del Video --}}
    <div class="absolute inset-0 bg-black/40 rounded-2xlrelative z-10 p-10 text-center text-white flex flex-col justify-start items-center">
        <div
            class="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f2780d]/20 backdrop-blur-sm">
            <span class="material-symbols-outlined text-3xl text-white">group</span>
        </div>
        <h2 class="text-2xl font-black tracking-tight">Apoya, crea, crece</h2>
        <p class="mt-2 text-sm opacity-90">
            Únete a la comunidad y da vida a tus ideas con Rise Together.
        </p>
    </div>
</div>