import { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import toast from "react-hot-toast";
import HeaderPublic from "../../components/public/header_public";

import TablaEventos from "../../components/admin/tabla_eventos";
import ModalEvento from "../../components/admin/modal_evento";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminEventos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [busqueda, setBusqueda] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [eventoEdit, setEventoEdit] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [eventoDelete, setEventoDelete] = useState(null);

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
        fetchEventos();
    }, []);

    const fetchEventos = () => {
        import("axios").then((axios) => {
            axios.default
                .get("/api/eventos")
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setEventos(res.data);
                    } else {
                        console.error("API did not return an array", res.data);
                        setEventos([]);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setEventos([]);
                    setLoading(false);
                });
        });
    };

    const eventosFiltrados = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        return eventos.filter((e) =>
            !q || e.nombre.toLowerCase().includes(q)
        );
    }, [eventos, busqueda]);

    const abrirCrear = () => {
        setEventoEdit(null);
        setModalOpen(true);
    };

    const abrirEditar = (evento) => {
        setEventoEdit(evento);
        setModalOpen(true);
    };

    const abrirBorrar = (evento) => {
        setEventoDelete(evento);
        setConfirmOpen(true);
    };

    const guardarEvento = (payload) => {
        import("axios").then((axios) => {
            if (eventoEdit) {
                axios.default
                    .put(`/api/eventos/${eventoEdit.id}`, payload)
                    .then((res) => {
                        setEventos((prev) =>
                            prev.map((e) => (e.id === eventoEdit.id ? res.data : e))
                        );
                        premiumToast.success("Evento actualizado correctamente.");
                        setModalOpen(false);
                        setEventoEdit(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        premiumToast.error("Error al actualizar el evento.");
                    });
            } else {
                axios.default
                    .post("/api/eventos", payload)
                    .then((res) => {
                        setEventos((prev) => [...prev, res.data]);
                        premiumToast.success("Evento creado con éxito.");
                        setModalOpen(false);
                        setEventoEdit(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        premiumToast.error("Error al crear el evento. Revisa los datos.");
                    });
            }
        });
    };

    const confirmarBorrado = () => {
        if (!eventoDelete) return;

        import("axios").then((axios) => {
            axios.default
                .delete(`/api/eventos/${eventoDelete.id}`)
                .then(() => {
                    setEventos((prev) => prev.filter((e) => e.id !== eventoDelete.id));
                    premiumToast.success("Evento eliminado.");
                    setConfirmOpen(false);
                    setEventoDelete(null);
                })
                .catch((err) => {
                    console.error(err);
                    premiumToast.error("Error al eliminar el evento.");
                });
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
            <HeaderPublic />

            <div className="flex flex-1 flex-col lg:flex-row">
                <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

                <div className="flex-1 w-full">
                    <main className="p-6">
                        {/* CABECERA */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <button 
                                    className="lg:hidden p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <div>
                                    <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                                        Gestión de Eventos
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Crea y organiza eventos para la comunidad.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => window.location.href = '/administrador/finalidades'}
                                    className="rounded-xl bg-[#f4ede7] dark:bg-[#3a2c20] px-5 py-2 font-bold text-[#1c140d] dark:text-white hover:brightness-95 transition"
                                >
                                    Gestionar Finalidades
                                </button>
                                <button
                                    onClick={abrirCrear}
                                    className="rounded-xl bg-[#f2780d] px-5 py-2 font-bold text-white hover:brightness-110 transition"
                                >
                                    + Nuevo evento
                                </button>
                            </div>
                        </div>

                        {/* FILTROS */}
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
                        <TablaEventos
                            eventos={eventosFiltrados}
                            onEdit={abrirEditar}
                            onDelete={abrirBorrar}
                        />

                        {/* MODAL CREAR/EDITAR */}
                        <ModalEvento
                            open={modalOpen}
                            onClose={() => {
                                setModalOpen(false);
                                setEventoEdit(null);
                            }}
                            evento={eventoEdit}
                            onSave={guardarEvento}
                        />

                        {/* CONFIRMAR DELETE */}
                        <ConfirmDelete
                            open={confirmOpen}
                            onCancel={() => {
                                setConfirmOpen(false);
                                setEventoDelete(null);
                            }}
                            onConfirm={confirmarBorrado}
                            title="¿Eliminar evento?"
                            description={
                                eventoDelete
                                    ? `Vas a eliminar el evento "${eventoDelete.nombre}". Esta acción no se puede deshacer.`
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
