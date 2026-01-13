export default function VideoLoginInicio() {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl md:flex">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/reunion.mp4" type="video/mp4" />
        Tu navegador no soporta el vídeo.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* TEXTO: MISMA ALTURA, CENTRADO SOLO EN HORIZONTAL */}
      <div className="absolute inset-0 z-10 flex justify-center items-start text-center text-white">
        <div className="p-10">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f2780d]/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-3xl text-white">
              group
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            Apoya, crea, crece
          </h2>

          <p className="mt-2 max-w-sm text-sm opacity-90 mx-auto">
            Únete a la comunidad y da vida a tus ideas con Rise Together.
          </p>
        </div>
      </div>
    </div>
  );
}
