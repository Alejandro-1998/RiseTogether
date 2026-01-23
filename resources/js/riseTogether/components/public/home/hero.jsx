export default function Hero() {
  return (
    <section className="my-8 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative isolate overflow-hidden rounded-2xl h-[520px] sm:h-[560px] md:h-[600px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute left-1/2 top-1/2 h-[135%] w-[150%] -translate-x-1/2 -translate-y-1/2 object-cover rounded-2xl"
          >
            <source src="/media/cinematica.mp4" type="video/mp4" />
            Tu navegador no soporta el vídeo.
          </video>

          <div className="absolute inset-0 bg-black/40 rounded-2xl" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center text-white">
            <h1 className="mt-3 text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Financia sueños. Crea impacto
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base opacity-90">
              Únete a una comunidad dedicada a impulsar el futuro. Descubre proyectos innovadores
              o lanza tu campaña hoy.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/proyectos"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-orange-500 px-6 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Descubrir Proyectos
              </a>

              <a
                href="/crear-proyecto"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white/90 px-6 text-sm font-bold text-gray-900 hover:bg-white"
              >
                Crea tu Proyecto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
