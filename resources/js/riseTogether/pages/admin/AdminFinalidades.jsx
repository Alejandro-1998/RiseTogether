import { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import toast from "react-hot-toast";
import HeaderPublic from "../../components/public/header_public";

import ConfirmDelete from "../../components/admin/confirm_delete";

function ModalFinalidad({ open, onClose, finalidad, onSave }) {
    const [tipoFinalidad, setTipoFinalidad] = useState("");

    useEffect(() => {
        if (finalidad) {
            setTipoFinalidad(finalidad.tipoFinalidad || "");
        } else {
            setTipoFinalidad("");
        }
    }, [finalidad, open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ tipoFinalidad });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1a120d] p-6 rounded-2xl shadow-xl w-full max-w-md border border-[#e8dace] dark:border-[#374151]">
                <h2 className="text-xl font-bold mb-4">
                    {finalidad ? "Editar Finalidad" : "Nueva Finalidad"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre (Tipo de Finalidad)</label>
                        <input
                            type="text"
                            required
                            value={tipoFinalidad}
                            onChange={(e) => setTipoFinalidad(e.target.value)}
                            className="w-full rounded-xl border border-[#e8dace] dark:border-[#374151] px-4 py-2 bg-transparent focus:ring-2 focus:ring-[#f2780d] outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#e8dace] dark:border-[#374151]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium bg-[#f2780d] text-white hover:brightness-110 rounded-lg transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AdminFinalidades() {
    const [finalidades, setFinalidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [busqueda, setBusqueda] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [finalidadEdit, setFinalidadEdit] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [finalidadDelete, setFinalidadDelete] = useState(null);

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
            iconTheme: { primary: '#f27f0d', secondary: '#fff' },
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
        fetchFinalidades();
    }, []);

    const fetchFinalidades = () => {
        import("axios").then((axios) => {
            axios.default
                .get("/api/finalidades")
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setFinalidades(res.data);
                    } else {
                        setFinalidades([]);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setFinalidades([]);
                    setLoading(false);
                });
        });
    };

    const filtradas = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        return finalidades.filter((f) =>
            !q || f.tipoFinalidad.toLowerCase().includes(q)
        );
    }, [finalidades, busqueda]);

    const abrirCrear = () => {
        setFinalidadEdit(null);
        setModalOpen(true);
    };

    const abrirEditar = (finalidad) => {
        setFinalidadEdit(finalidad);
        setModalOpen(true);
    };

    const abrirBorrar = (finalidad) => {
        setFinalidadDelete(finalidad);
        setConfirmOpen(true);
    };

    const guardarFinalidad = (payload) => {
        import("axios").then((axios) => {
            if (finalidadEdit) {
                axios.default
                    .put(`/api/finalidades/${finalidadEdit.id}`, payload)
                    .then((res) => {
                        setFinalidades((prev) =>
                            prev.map((f) => (f.id === finalidadEdit.id ? res.data : f))
                        );
                        premiumToast.success("Finalidad actualizada correctamente.");
                        setModalOpen(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        premiumToast.error(err.response?.data?.message || "Error al actualizar.");
                    });
            } else {
                axios.default
                    .post("/api/finalidades", payload)
                    .then((res) => {
                        setFinalidades((prev) => [...prev, res.data]);
                        premiumToast.success("Finalidad creada con éxito.");
                        setModalOpen(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        premiumToast.error(err.response?.data?.message || "Error al crear la finalidad.");
                    });
            }
        });
    };

    const confirmarBorrado = () => {
        if (!finalidadDelete) return;

        import("axios").then((axios) => {
            axios.default
                .delete(`/api/finalidades/${finalidadDelete.id}`)
                .then(() => {
                    setFinalidades((prev) => prev.filter((f) => f.id !== finalidadDelete.id));
                    premiumToast.success("Finalidad eliminada (Soft Delete).");
                    setConfirmOpen(false);
                    setFinalidadDelete(null);
                })
                .catch((err) => {
                    console.error(err);
                    premiumToast.error("Error al eliminar.");
                });
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
            <HeaderPublic />
            <div className="flex flex-1 flex-col md:flex-row">
                <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
                <div className="flex-1 w-full">
                    <main className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <button 
                                    className="md:hidden p-2 bg-white dark:bg-[#1a120d] rounded-lg shadow-sm border border-[#e8dace] dark:border-[#374151]"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <div>
                                    <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                                        Gestión de Finalidades
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Administra los tipos de finalidades para los eventos.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => window.location.href = '/administrador/eventos'}
                                    className="rounded-xl bg-[#f4ede7] dark:bg-[#3a2c20] px-5 py-2 font-bold text-[#1c140d] dark:text-white hover:brightness-95 transition"
                                >
                                    Volver a Eventos
                                </button>
                                <button
                                    onClick={abrirCrear}
                                    className="rounded-xl bg-[#f2780d] px-5 py-2 font-bold text-white hover:brightness-110 transition"
                                >
                                    + Nueva finalidad
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="w-full max-w-xl">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        search
                                    </span>
                                    <input
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        placeholder="Buscar finalidad..."
                                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <p>Cargando finalidades...</p>
                        ) : (
                            <div className="overflow-x-auto bg-white dark:bg-[#1a120d] rounded-2xl shadow-sm border border-[#e8dace] dark:border-[#374151]">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="border-b border-[#e8dace] dark:border-[#374151] bg-[#f8f7f5] dark:bg-[#1a120d]">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">ID</th>
                                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Tipo de Finalidad</th>
                                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 w-24">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e8dace] dark:divide-[#374151]">
                                        {filtradas.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                                    No se encontraron finalidades.
                                                </td>
                                            </tr>
                                        ) : (
                                            filtradas.map((f) => (
                                                <tr key={f.id} className="hover:bg-[#f8f7f5] dark:hover:bg-[#2d2d2d] transition">
                                                    <td className="px-6 py-4 font-medium">#{f.id}</td>
                                                    <td className="px-6 py-4">{f.tipoFinalidad}</td>
                                                    <td className="px-6 py-4 flex gap-2">
                                                        <button
                                                            onClick={() => abrirEditar(f)}
                                                            className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-bold text-blue-700 dark:text-blue-400 hover:brightness-110 transition"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => abrirBorrar(f)}
                                                            className="rounded-lg bg-red-100 dark:bg-red-900/30 px-3 py-1 text-sm font-bold text-red-700 dark:text-red-400 hover:brightness-110 transition"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <ModalFinalidad
                            open={modalOpen}
                            onClose={() => {
                                setModalOpen(false);
                                setFinalidadEdit(null);
                            }}
                            finalidad={finalidadEdit}
                            onSave={guardarFinalidad}
                        />

                        <ConfirmDelete
                            open={confirmOpen}
                            onCancel={() => {
                                setConfirmOpen(false);
                                setFinalidadDelete(null);
                            }}
                            onConfirm={confirmarBorrado}
                            title="¿Eliminar finalidad?"
                            description={
                                finalidadDelete
                                    ? `Vas a eliminar la finalidad "${finalidadDelete.tipoFinalidad}". No se perderán de eventos pasados.`
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
