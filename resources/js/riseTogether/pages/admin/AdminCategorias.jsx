import { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import toast from "react-hot-toast";
import HeaderPublic from "../../components/public/header_public";

import TablaCategorias from "../../components/admin/tabla_categorias";
import ModalCategoria from "../../components/admin/modal_categoria";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI state
    const [busqueda, setBusqueda] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [categoriaEdit, setCategoriaEdit] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [categoriaDelete, setCategoriaDelete] = useState(null);

    // Premium Toast Style
    const premiumToast = {
        success: (msg) => toast.success(msg, {
            style: {
                borderRadius: '16px',
                background: '#1c140d',
                color: '#fff',
                border: '1px solid rgba(242, 127, 13, 0.2)',
                padding: '16px',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#f27f0d',
                secondary: '#fff',
            },
        }),
        error: (msg) => toast.error(msg, {
            style: {
                borderRadius: '16px',
                background: '#1c140d',
                color: '#fff',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '16px',
                fontWeight: 'bold',
            },
        }),
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = () => {
        import("axios").then((axios) => {
            axios.default
                .get("/api/categorias")
                .then((res) => {
                    setCategorias(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        });
    };

    const categoriasFiltradas = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        return categorias.filter((c) =>
            !q || c.nombre.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
        );
    }, [categorias, busqueda]);

    const abrirCrear = () => {
        setCategoriaEdit(null);
        setModalOpen(true);
    };

    const abrirEditar = (categoria) => {
        setCategoriaEdit(categoria);
        setModalOpen(true);
    };

    const abrirBorrar = (categoria) => {
        setCategoriaDelete(categoria);
        setConfirmOpen(true);
    };

    const guardarCategoria = (payload) => {
        const dataToSend = {
            nombre: payload.nombre,
        };

        import("axios").then((axios) => {
            if (categoriaEdit) {
                // Editar
                axios.default
                    .put(`/api/categorias/${categoriaEdit.id}`, dataToSend)
                    .then((res) => {
                        setCategorias((prev) =>
                            prev.map((c) => (c.id === categoriaEdit.id ? res.data : c))
                        );
                        premiumToast.success("Categoría actualizada.");
                        setModalOpen(false);
                        setCategoriaEdit(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        premiumToast.error("Error al actualizar la categoría. Revisa duplicados.");
                    });
            } else {
                // Crear
                axios.default
                    .post("/api/categorias", dataToSend)
                    .then((res) => {
                        setCategorias((prev) => [...prev, res.data]);
                        premiumToast.success("Categoría creada con éxito.");
                        setModalOpen(false);
                        setCategoriaEdit(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        premiumToast.error("Error al crear la categoría. Revisa duplicados.");
                    });
            }
        });
    };

    const confirmarBorrado = () => {
        if (!categoriaDelete) return;

        import("axios").then((axios) => {
            axios.default
                .delete(`/api/categorias/${categoriaDelete.id}`)
                .then(() => {
                    setCategorias((prev) => prev.filter((c) => c.id !== categoriaDelete.id));
                    premiumToast.success("Categoría eliminada.");
                    setConfirmOpen(false);
                    setCategoriaDelete(null);
                })
                .catch((err) => {
                    console.error(err);
                    premiumToast.error("Error al eliminar la categoría.");
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
                        {/* CABECERA */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-3xl font-bold leading-tight tracking-tight">
                                    Categorías
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    Gestiona las categorías de proyectos disponibles.
                                </p>
                            </div>

                            <button
                                onClick={abrirCrear}
                                className="rounded-xl bg-[#f2780d] px-5 py-2 font-bold text-white hover:brightness-110 transition"
                            >
                                + Nueva categoría
                            </button>
                        </div>

                        {/* FILTROS (Solo buscador) */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="w-full max-w-xl">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        search
                                    </span>
                                    <input
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        placeholder="Buscar por nombre..."
                                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* TABLA */}
                        <TablaCategorias
                            categorias={categoriasFiltradas}
                            onEdit={abrirEditar}
                            onDelete={abrirBorrar}
                        />

                        {/* MODAL CREAR/EDITAR */}
                        <ModalCategoria
                            open={modalOpen}
                            onClose={() => {
                                setModalOpen(false);
                                setCategoriaEdit(null);
                            }}
                            categoria={categoriaEdit}
                            onSave={guardarCategoria}
                        />

                        {/* CONFIRM DELETE */}
                        <ConfirmDelete
                            open={confirmOpen}
                            onCancel={() => {
                                setConfirmOpen(false);
                                setCategoriaDelete(null);
                            }}
                            onConfirm={confirmarBorrado}
                            title="¿Eliminar categoría?"
                            description={
                                categoriaDelete
                                    ? `Vas a eliminar la categoría "${categoriaDelete.nombre}". Esta acción no se puede deshacer.`
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
