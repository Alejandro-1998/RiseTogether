import { Link } from "react-router-dom";

export default function HeaderAuth() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#f4ede7]/80 bg-[#fcfaf8]/80 px-4 py-3 backdrop-blur-sm dark:border-[#2a2017]/80 dark:bg-[#1c140d]/80 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between" aria-label="Auth">
        {/* Logo pequeño */}
        <Link to="/" className="flex items-center gap-3 text-[#1c140d] dark:text-[#fcfaf8]">
          <img
            src="/img/logo.png"
            alt="Rise Together"
            className="max-h-14 w-auto object-contain"
          />
        </Link>

        {/* Botón volver */}
        <Link
          to="/"
          className="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfaf8] dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#2a2017]/80 dark:focus-visible:ring-offset-[#1c140d]"
        >
          Volver a Inicio
        </Link>
      </nav>
    </header>
  );
}
