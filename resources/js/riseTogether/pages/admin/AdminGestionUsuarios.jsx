// resources/js/riseTogether/pages/admin/AdminGestionUsuarios.jsx
import { useMemo, useState } from "react";

import Sidebar from "../../components/admin/sidebar";
import Header from "../../components/admin/header_admin";

import TablaUsuarios from "../../components/admin/tabla_usuarios";
import ModalUsuario from "../../components/admin/modal_usuario";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminGestionUsuarios() {
  // Datos dummy (luego lo conectamos al back)
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Fali de la Fuente",
      email: "fali@risetogether.com",
      rol: "Admin",
      estado: "Activo",
      fecha: "2025-10-26",
    },
    {
      id: 2,
      nombre: "Santi",
      email: "santi@risetogether.com",
      rol: "Creador",
      estado: "Activo",
      fecha: "2025-09-11",
    },
    {
      id: 3,
      nombre: "María",
      email: "maria@risetogether.com",
      rol: "Usuario",
      estado: "Bloqueado",
      fecha: "2025-08-01",
    },
  ]);

  // UI state
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [usuarioDelete, setUsuarioDelete] = useState(null);

  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();

    return usuarios.filter((u) => {
      const matchBusqueda =
        !q ||
        u.nombre.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.rol.toLowerCase().includes(q);

      const matchRol = filtroRol === "Todos" || u.rol === filtroRol;
      const matchEstado = filtroEstado === "Todos" || u.estado === filtroEstado;

      return matchBusqueda && matchRol && matchEstado;
    });
  }, [usuarios, busqueda, filtroRol, filtroEstado]);

  const abrirCrear = () => {
    setUsuarioEdit(null);
    setModalOpen(true);
  };

  const abrirEditar = (usuario) => {
    setUsuarioEdit(usuario);
    setModalOpen(true);
  };

  const abrirBorrar = (usuario) => {
    setUsuarioDelete(usuario);
    setConfirmOpen(true);
  };

  const guardarUsuario = (payload) => {
    // payload: {nombre,email,rol,estado}
    if (usuarioEdit) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioEdit.id ? { ...u, ...payload } : u))
      );
    } else {
      const nuevo = {
        id: Date.now(),
        ...payload,
        fecha: new Date().toISOString().slice(0, 10),
      };
      setUsuarios((prev) => [nuevo, ...prev]);
    }
    setModalOpen(false);
    setUsuarioEdit(null);
  };

  const confirmarBorrado = () => {
    if (!usuarioDelete) return;
    setUsuarios((prev) => prev.filter((u) => u.id !== usuarioDelete.id));
    setConfirmOpen(false);
    setUsuarioDelete(null);
  };

  return (
    <div className="min-h-screen flex bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
      <Sidebar />

      <div className="ml-64 w-full">
        <Header />

        <main className="p-6">
          {/* CABECERA (igual que proyectos) */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-3xl font-bold leading-tight tracking-tight">
                Gestión de usuarios
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Gestiona usuarios: crear, editar, eliminar y filtrar por rol/estado.
              </p>
            </div>

            <button
              onClick={abrirCrear}
              className="px-5 py-2.5 rounded-xl font-semibold bg-[#ff7a00] hover:opacity-90 text-white shadow"
            >
              + Crear usuario
            </button>
          </div>

          {/* FILTROS (buscador + selects) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="w-full max-w-xl">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70">
                  🔍
                </span>
                <input
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, email o rol..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
              >
                <option>Todos</option>
                <option>Admin</option>
                <option>Creador</option>
                <option>Usuario</option>
              </select>

              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
              >
                <option>Todos</option>
                <option>Activo</option>
                <option>Bloqueado</option>
                <option>Pendiente</option>
              </select>
            </div>
          </div>

          {/* TABLA */}
          <TablaUsuarios
            usuarios={usuariosFiltrados}
            onEdit={abrirEditar}
            onDelete={abrirBorrar}
          />

          {/* MODAL CREAR/EDITAR */}
          <ModalUsuario
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setUsuarioEdit(null);
            }}
            usuario={usuarioEdit}
            onSave={guardarUsuario}
          />

          {/* CONFIRM DELETE (reutiliza tu componente) */}
          <ConfirmDelete
            open={confirmOpen}
            onClose={() => {
              setConfirmOpen(false);
              setUsuarioDelete(null);
            }}
            onConfirm={confirmarBorrado}
            title="¿Eliminar usuario?"
            description={
              usuarioDelete
                ? `Vas a eliminar a "${usuarioDelete.nombre}". Esta acción no se puede deshacer.`
                : "Esta acción no se puede deshacer."
            }
            confirmText="Eliminar"
          />
        </main>
      </div>
    </div>
  );
}
