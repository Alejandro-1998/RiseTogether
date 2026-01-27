import { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";
import TablaProyectos from "../../components/admin/tabla_proyectos";
import ModalProyecto from "../../components/admin/modal_proyecto";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminGestionProyectos() {
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("todos"); // todos | pendiente | activo | rechazado | finalizado
  const [openModal, setOpenModal] = useState(false);
  const [modo, setModo] = useState("create"); // create | edit
  const [seleccionado, setSeleccionado] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [aBorrar, setABorrar] = useState(null);

  // ✅ Mock data (luego fetch /api/admin/proyectos)
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    import("axios").then((axios) => {
      axios.default.get("/api/admin/proyectos")
        .then((res) => {
          const mapped = res.data.map((p) => ({
            id: p.id,
            nombre: p.titulo,
            creador: p.user ? (p.user.nombreUsuario || p.user.nombreCompleto || "Desconocido") : "Desconocido",
            categoria: p.categoria ? p.categoria.nombre : "Sin categoría",
            recaudado: Number(p.cantidad_recaudada || 0),
            estado: p.estado || "borrador",
            fecha_envio: p.created_at ? p.created_at.substring(0, 10) : "",
          }));
          setProyectos(mapped);
        })
        .catch((err) => console.error(err));
    });
  }, []);

  const proyectosFiltrados = useMemo(() => {
    let arr = [...proyectos];

    if (estado !== "todos") {
      arr = arr.filter((p) => p.estado === estado);
    }

    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.nombre.toLowerCase().includes(s) ||
          p.creador.toLowerCase().includes(s) ||
          p.categoria.toLowerCase().includes(s)
      );
    }

    return arr;
  }, [proyectos, q, estado]);

  const abrirCrear = () => {
    setModo("create");
    setSeleccionado(null);
    setOpenModal(true);
  };

  const abrirEditar = (proyecto) => {
    setModo("edit");
    setSeleccionado(proyecto);
    setOpenModal(true);
  };

  const pedirBorrar = (proyecto) => {
    setABorrar(proyecto);
    setOpenDelete(true);
  };

  // ✅ Guardar (mock). Luego se conecta a Laravel
  const guardarProyecto = (data) => {
    if (modo === "create") {
      const nuevo = {
        id: Date.now(),
        ...data,
        fecha_envio: new Date().toISOString().slice(0, 10),
        recaudado: Number(data.recaudado || 0),
      };
      setProyectos((prev) => [nuevo, ...prev]);
    } else {
      setProyectos((prev) =>
        prev.map((p) => (p.id === seleccionado.id ? { ...p, ...data } : p))
      );
    }
    setOpenModal(false);
  };

  const confirmarBorrar = () => {
    setProyectos((prev) => prev.filter((p) => p.id !== aBorrar.id));
    setOpenDelete(false);
    setABorrar(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
      <HeaderPublic />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 w-full">

          <main className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">Gestión de proyectos</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Gestiona proyectos: crear, editar, eliminar y filtrar por estado.
                </p>
              </div>

              <button
                onClick={abrirCrear}
                className="rounded-xl bg-[#f2780d] px-5 py-2 font-bold text-white hover:brightness-110 transition"
              >
                + Crear proyecto
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
              <div className="relative w-full md:max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  search
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por nombre, creador o categoría..."
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-white dark:bg-[#1a120d] border border-gray-200 dark:border-gray-800 outline-none focus:ring-2 focus:ring-[#f2780d]/30"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <SelectEstado value={estado} onChange={setEstado} />
              </div>
            </div>

            {/* Tabla */}
            <TablaProyectos
              proyectos={proyectosFiltrados}
              onEdit={abrirEditar}
              onDelete={pedirBorrar}
            />
          </main>
        </div>

        <ModalProyecto
          open={openModal}
          modo={modo}
          proyecto={seleccionado}
          onClose={() => setOpenModal(false)}
          onSave={guardarProyecto}
        />

        <ConfirmDelete
          open={openDelete}
          titulo="Eliminar proyecto"
          descripcion={
            aBorrar
              ? `Vas a eliminar "${aBorrar.nombre}". Esta acción no se puede deshacer.`
              : ""
          }
          onCancel={() => setOpenDelete(false)}
          onConfirm={confirmarBorrar}
        />
      </div>
    </div>
  );
}

function SelectEstado({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl bg-white dark:bg-[#1a120d] border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm outline-none"
    >
      <option value="todos">Todos</option>
      <option value="borrador">Borrador</option>
      <option value="revision">Revisión</option>
      <option value="publicado">Publicado</option>
      <option value="completado">Completado</option>
      <option value="fallido">Fallido</option>
      <option value="cancelado">Cancelado</option>
    </select>
  );
}
