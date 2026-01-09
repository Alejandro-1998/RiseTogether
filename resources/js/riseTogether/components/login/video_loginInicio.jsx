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

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-start p-10 text-center text-white">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f2780d]/20 backdrop-blur-sm">
          <span className="material-symbols-outlined text-3xl text-white">
            group
          </span>
        </div>

        <h2 className="text-2xl font-black tracking-tight">Apoya, crea, crece</h2>

        <p className="mt-2 text-sm opacity-90">
          Únete a la comunidad y da vida a tus ideas con Rise Together.
        </p>
      </div>
    </div>
  );
}
