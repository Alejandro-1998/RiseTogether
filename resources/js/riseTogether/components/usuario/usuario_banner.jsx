export default function UsuarioBanner({ usuario }) {
  return (
    <div className="relative mb-20">
      <div
        className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[280px] shadow-sm"
        style={{ backgroundImage: `url("${usuario.bannerUrl}")` }}
      >
        <span className="sr-only">Banner del usuario</span>
      </div>

      <div className="absolute -bottom-20 left-4 sm:left-8 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
          <div className="flex gap-4">
            <div
              className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 sm:min-h-32 sm:w-32 border-4 border-[#fcfaf8] dark:border-[#1a1a1a]"
              style={{ backgroundImage: `url("${usuario.avatarUrl}")` }}
            >
              <span className="sr-only">Foto de perfil</span>
            </div>

            <div className="flex flex-col justify-center pt-8 sm:pt-0 sm:pb-2 bg-white dark:bg-[#2d2d2d] rounded-2xl p-7 shadow-sm border border-[#e8dace] dark:border-[#374151] mt-4 mb-4">
              <p className="text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em]">
                {usuario.nombre}
              </p>
              <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm sm:text-base font-normal leading-normal">
                {usuario.username}
              </p>
              <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm sm:text-base font-normal leading-normal">
                {usuario.ubicacion}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto mb-5">
            <button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-2xl h-10 px-6 bg-[#f2780d] text-white text-sm font-bold w-full sm:w-auto shadow-sm hover:opacity-90">
              Seguir
            </button>

            <button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-2xl h-10 px-6 border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] text-sm font-medium w-full sm:w-auto hover:bg-black/5 dark:hover:bg-white/5">
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
