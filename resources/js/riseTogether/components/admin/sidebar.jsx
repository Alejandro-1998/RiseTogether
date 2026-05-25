import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const itemBase =
    "flex items-center gap-3 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50";

  const itemActive =
    "flex items-center gap-3 px-3 py-2 rounded-2xl text-sm font-bold bg-[#f2780d]/20 text-[#f2780d]";

  const isActive = (path) => currentPath === path || currentPath.startsWith(path + "/");

  return (
    <>
      {/* Backdrop para móviles */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <aside className={`w-64 shrink-0 bg-white dark:bg-[#120b07] border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:translate-x-0 lg:z-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>

      {/* Menú 1*/}
      <nav className="flex-1 px-2 py-4 space-y-2 text-sm">
        {/* Dashboard */}
        <Link className={currentPath === "/administrador" ? itemActive : itemBase} to="/administrador">
          <span className="material-symbols-outlined text-2xl">dashboard</span>
          Panel de administración
        </Link>

        {/* Secciones */}
        <Link className={isActive("/administrador/proyectos") ? itemActive : itemBase} to="/administrador/proyectos">
          <span className="material-symbols-outlined">folder</span>
          Gestión de proyectos
        </Link>

        <Link className={isActive("/administrador/usuarios") ? itemActive : itemBase} to="/administrador/usuarios">
          <span className="material-symbols-outlined">group</span>
          Usuarios
        </Link>

        <Link className={isActive("/administrador/categorias") ? itemActive : itemBase} to="/administrador/categorias">
          <span className="material-symbols-outlined">sell</span>
          Categorías
        </Link>

        <Link className={isActive("/administrador/eventos") ? itemActive : itemBase} to="/administrador/eventos">
          <span className="material-symbols-outlined">event</span>
          Eventos
        </Link>

        <Link className={isActive("/administrador/pagos") ? itemActive : itemBase} to="/administrador/pagos">
          <span className="material-symbols-outlined">payments</span>
          Pagos y facturación
        </Link>
      </nav>

      {/* Footer */}

    </aside>
    </>
  );
}
