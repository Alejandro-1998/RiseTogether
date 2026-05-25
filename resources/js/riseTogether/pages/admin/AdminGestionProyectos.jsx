import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";
import TablaProyectos from "../../components/admin/tabla_proyectos";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminGestionProyectos() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("todos");
  const [seleccionado, setSeleccionado] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [aBorrar, setABorrar] = useState(null);

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/proyectos")
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
    navigate("/crear-proyecto");
  };

  const abrirEditar = (proyecto) => {
    navigate(`/editar-proyecto/${proyecto.id}`);
  };

  const pedirBorrar = (proyecto) => {
    setABorrar(proyecto);
    setOpenDelete(true);
  };

  const confirmarBorrar = async () => {
    try {
      await axios.delete(`/api/proyectos/${aBorrar.id}`);
      setProyectos((prev) => prev.filter((p) => p.id !== aBorrar.id));
      toast.success("Proyecto eliminado con éxito.");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el proyecto.");
    } finally {
      setOpenDelete(false);
      setABorrar(null);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.put(`/api/admin/proyectos/${id}/estado`, { estado: nuevoEstado });
      setProyectos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
      );
      toast.success(`Proyecto ${nuevoEstado === 'publicado' ? 'aprobado' : 'rechazado'} con éxito.`);
    } catch (error) {
      console.error(error);
      toast.error("Error al cambiar el estado del proyecto.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
      <HeaderPublic />

      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

        <div className="flex-1 w-full">

          <main className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button 
                  className="lg:hidden p-2 bg-white dark:bg-[#1a120d] rounded-lg shadow-sm border border-[#e8dace] dark:border-[#374151]"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="material-symbols-outlined">menu</span>
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Gestión de proyectos</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Gestiona proyectos: crear, editar, eliminar y filtrar por estado.
                  </p>
                </div>
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
              onCambiarEstado={cambiarEstado}
            />
          </main>
        </div>



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
