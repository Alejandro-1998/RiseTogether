// src/components/admin/sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  // Estilo base para los enlaces NO activos
  const itemBase =
    "flex items-center gap-3 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50";

  // Estilo del enlace ACTIVO (ahora mismo marcamos el panel)
  const itemActive =
    "flex items-center gap-3 px-3 py-2 rounded-2xl text-sm font-bold bg-[#f2780d]/20 text-[#f2780d]";

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex flex-col sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      {/* Menu starts directly, Logo is in Header */}

      {/* Menú 1*/}
      <nav className="flex-1 px-2 py-4 space-y-2 text-sm">
        {/* Activo */}
        <Link className={itemActive} to="/administrador">
          <span className="material-symbols-outlined text-2xl">dashboard</span>
          Panel de administración
        </Link>

        {/* Secciones futuras (enlaces) */}
        <Link className={itemBase} to="/administrador/proyectos">
          <span className="material-symbols-outlined">folder</span>
          Gestión de proyectos
        </Link>

        <Link className={itemBase} to="/administrador/usuarios">
          <span className="material-symbols-outlined">group</span>
          Usuarios
        </Link>

        <a className={itemBase} href="#categorias">
          <span className="material-symbols-outlined">sell</span>
          Categorías
        </a>

        <a className={itemBase} href="#informes">
          <span className="material-symbols-outlined">bar_chart</span>
          Informes
        </a>

        <a className={itemBase} href="#pagos">
          <span className="material-symbols-outlined">payments</span>
          Pagos y facturación
        </a>

        {/* EXTRA (muy típico en admin) */}
        <a className={itemBase} href="#moderacion">
          <span className="material-symbols-outlined">gavel</span>
          Moderación
        </a>

        <a className={itemBase} href="#configuracion">
          <span className="material-symbols-outlined">settings</span>
          Configuración del sistema
        </a>

        <a className={itemBase} href="#soporte">
          <span className="material-symbols-outlined">support_agent</span>
          Soporte
        </a>
      </nav>

      {/* Footer (acciones) */}

    </aside>
  );
}
