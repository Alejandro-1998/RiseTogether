import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function HeaderPublic({ isAuth }) {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    import("axios").then((axios) => {
      axios.default.get("/api/categorias")
        .then((res) => setCategories(res.data))
        .catch((err) => console.error("Error fetching categories:", err));
    });
  }, []);

  const { isAuth: authState, logout } = useAuth();
  // Allow prop override, otherwise use hook
  const authenticated = isAuth !== undefined ? isAuth : authState;

  const isLogin = pathname === "/login";
  const isRegister = pathname === "/registro";
  const isProyecto = pathname.startsWith("/proyecto");

  const showSearch = !isLogin && !isRegister;
  const showCategories = !isLogin && !isRegister && !isProyecto;

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-[#f4ede7]/80 bg-[#fcfaf8]/80 px-4 py-3 backdrop-blur-sm dark:border-[#3a2c20]/80 dark:bg-[#120b07]/80 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between gap-4" aria-label="Primary">
        {/* Logo + buscador */}
        {showSearch ? (
          <>
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 text-[#1c140d] dark:text-[#fcfaf8]">
                <img
                  src="/img/logo.png"
                  alt="Rise Together"
                  className="max-h-20 w-auto object-contain"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 text-[#1c140d] dark:text-[#fcfaf8]">
              <img
                src="/img/logo.png"
                alt="Rise Together"
                className="max-h-14 w-auto object-contain"
              />
            </Link>
          </div>
        )}

        {/* Botones derecha */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden items-center justify-end gap-3 md:flex">
            {authenticated ? (
              <>
                <Link
                  to="/crear-proyecto"
                  className="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Crear Proyecto
                </Link>

                {/* Círculo de perfil (visual, no click) */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ede7] text-[#1c140d] cursor-pointer dark:bg-[#2a2017] dark:text-[#fcfaf8]"
                  title="Sesión Iniciada"
                >
                  <Link
                    to="/usuario"
                  >
                    <span className="material-symbols-outlined">person</span>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  className="flex h-10 items-center justify-center rounded-lg border border-[#f2780d] px-4 text-sm font-bold text-[#f2780d] transition-colors hover:bg-[#f2780d] hover:text-white"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                {!isLogin && !isRegister ? (
                  <>
                    <Link
                      to="/login"
                      className="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#3a2c20]"
                    >
                      Iniciar Sesión
                    </Link>

                    <Link
                      to="/login"
                      state={{ from: "/crear-proyecto" }}
                      className="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Crear Proyecto
                    </Link>
                  </>
                ) : isLogin ? (
                  <>
                    <Link
                      to="/"
                      className="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#3a2c20]"
                    >
                      Volver a Inicio
                    </Link>

                    <Link
                      to="/registro"
                      className="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Registrarse
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      className="flex h-10 min-w-[135px] items-center justify-center rounded-lg bg-[#f4ede7] px-4 text-sm font-bold text-[#1c140d] transition-colors hover:bg-[#f4ede7]/80 dark:bg-[#2a2017] dark:text-[#fcfaf8] dark:hover:bg-[#3a2c20]"
                    >
                      Volver a Inicio
                    </Link>

                    <Link
                      to="/login"
                      className="flex h-10 min-w-[150px] items-center justify-center rounded-lg bg-[#f2780d] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Iniciar Sesión
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden flex h-10 items-center justify-center gap-2 rounded-lg bg-[#f4ede7] px-2.5 text-sm font-bold text-[#1c140d] dark:bg-[#2a2017] dark:text-[#fcfaf8]"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">menu</span>
            <span className="sr-only">Abrir Menú</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
