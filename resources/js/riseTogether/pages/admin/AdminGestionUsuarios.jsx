// resources/js/riseTogether/pages/admin/AdminGestionUsuarios.jsx
import { useMemo, useState, useEffect } from "react";

import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";

import TablaUsuarios from "../../components/admin/tabla_usuarios";
import ModalUsuario from "../../components/admin/modal_usuario";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminGestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users real
    import("axios").then((axios) => {
      axios.default.get("/api/users")
        .then((res) => {
          // Mapear campos de BD a lo que espera la tabla si es necesario
          // BD: nombreUsuario, nombreCompleto, email, created_at, rol? (no rol yet in basic user table usually, assuming 'role' column or similar)
          // Si no hay rol en BD, default a 'Usuario' o check fields.
          const mapped = res.data.map(u => {
            // Check roles
            let roleDisplay = "Usuario";
            if (u.roles_list && Array.isArray(u.roles_list)) {
              if (u.roles_list.includes("admin") || u.roles_list.includes("Admin")) {
                roleDisplay = "Admin";
              }
              // If not admin, it stays "Usuario"
            }

            return {
              id: u.id,
              nombre: u.nombreUsuario || "Sin nombre",
              email: u.email,
              rol: roleDisplay,
              estado: u.deleted_at ? "Bloqueado" : "Activo",
              fecha: u.created_at ? u.created_at.substring(0, 10) : "",
            };
          });
          setUsuarios(mapped);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, []);

  // ... (UI state)



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
    const dataToSend = {
      nombreUsuario: payload.nombre,
      email: payload.email,
      role: payload.rol.toLowerCase(), // "Admin" -> "admin", "Usuario" -> "usuario"
    };

    import("axios").then((axios) => {
      if (usuarioEdit) {
        axios.default.put(`/api/users/${usuarioEdit.id}`, dataToSend)
          .then(res => {
            // Update local state
            setUsuarios((prev) =>
              prev.map((u) => (u.id === usuarioEdit.id ? { ...u, ...payload } : u))
            );
            setModalOpen(false);
            setUsuarioEdit(null);
          })
          .catch(err => {
            console.error(err);
            alert("Error al actualizar usuario. Revisa la consola.");
          });
      } else {
        // Create Logic (Simulated for now as backend create is not requested yet)
        const nuevo = {
          id: Date.now(),
          ...payload,
          fecha: new Date().toISOString().slice(0, 10),
        };
        setUsuarios((prev) => [nuevo, ...prev]);
        setModalOpen(false);
        setUsuarioEdit(null);
      }
    });
  };

  const confirmarBorrado = () => {
    if (!usuarioDelete) return;

    import("axios").then((axios) => {
      axios.default.delete(`/api/users/${usuarioDelete.id}`)
        .then(() => {
          setUsuarios((prev) => prev.filter((u) => u.id !== usuarioDelete.id));
          setConfirmOpen(false);
          setUsuarioDelete(null);
        })
        .catch(err => {
          console.error(err);
          alert("Error al eliminar usuario.");
        });
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
      <HeaderPublic />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 w-full">

          <main className="p-6">
            {/* CABECERA (igual que proyectos) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
                className="rounded-xl bg-[#f2780d] px-5 py-2 font-bold text-white hover:brightness-110 transition"
              >
                + Crear usuario
              </button>
            </div>

            {/* FILTROS (buscador + selects) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="w-full max-w-xl">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    search
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
              onCancel={() => {
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
    </div>
  );
}
