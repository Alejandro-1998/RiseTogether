import { Link } from "react-router-dom";

export default function FooterPublic() {
  return (
    <footer className="bg-[#f4ede7] dark:bg-[#2a2017]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3 text-[#1c140d] dark:text-[#fcfaf8]">
                <img
                  src="/img/logo.png"
                  alt="Rise Together"
                  className="max-h-12 w-auto object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Descubrir */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1c140d] dark:text-[#fcfaf8]">
              Descubrir
            </h3>
            <ul className="mt-4 space-y-2">
              {["Proyectos", "Eventos"].map((item) => (
                <li key={item}>
                  <Link
                    to="/proyectos"
                    className="text-sm text-[#9c7049] transition-colors hover:text-[#f2780d] dark:text-[#a18a7a] dark:hover:text-[#f2780d]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sobre */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1c140d] dark:text-[#fcfaf8]">
              Sobre
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Nosotros", to: "#" },
                { label: "Profesiones", to: "#" },
                { label: "Noticias", to: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.to}
                    className="text-sm text-[#9c7049] transition-colors hover:text-[#f2780d] dark:text-[#a18a7a] dark:hover:text-[#f2780d]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1c140d] dark:text-[#fcfaf8]">
              Ayuda
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Centro de contacto", to: "#" },
                { label: "Nuestras normas", to: "#" },
                { label: "Recursos para creadores", to: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.to}
                    className="text-sm text-[#9c7049] transition-colors hover:text-[#f2780d] dark:text-[#a18a7a] dark:hover:text-[#f2780d]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-8 border-t border-[#9c7049]/20 pt-8 text-center dark:border-[#a18a7a]/20">
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-[#9c7049] dark:text-[#a18a7a]">
            <Link to="/" className="font-semibold hover:text-[#f2780d]">
              Rise Together
            </Link>{" "}
            © 2025 by{" "}
            <Link to="/" className="font-semibold hover:text-[#f2780d]">
              Rise Together
            </Link>{" "}
            is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
              className="font-semibold hover:text-[#f2780d]"
            >
              CC BY-NC-ND 4.0
            </a>
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
              alt="CC"
              className="ml-1 h-4 w-4"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
              alt="BY"
              className="ml-1 h-4 w-4"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"
              alt="NC"
              className="ml-1 h-4 w-4"
            />
            <img
              src="https://mirrors.creativecommons.org/presskit/icons/nd.svg"
              alt="ND"
              className="ml-1 h-4 w-4"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
