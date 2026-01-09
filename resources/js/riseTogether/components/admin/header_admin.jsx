export default function HeaderAdmin() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* BUSCADOR */}
        <div className="flex w-full max-w-xl items-center gap-3">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              search
            </span>

            <input
              type="text"
              placeholder="Buscar proyectos, usuarios..."
              className="w-full rounded-full border border-gray-200 bg-gray-100 py-2 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f2780d]/40 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* ACCIONES DERECHA */}
        <div className="ml-6 flex items-center gap-4">
          {/* NOTIFICACIONES */}
          <button
            type="button"
            className="relative rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined text-gray-700 dark:text-gray-200">
              notifications
            </span>

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* AVATAR USUARIO */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4ede7] text-sm font-bold text-[#1c140d] transition hover:ring-2 hover:ring-[#f2780d] dark:bg-[#2a2017] dark:text-[#fcfaf8]"
            aria-label="Perfil"
          >
            A
          </button>
        </div>
      </div>
    </header>
  );
}
