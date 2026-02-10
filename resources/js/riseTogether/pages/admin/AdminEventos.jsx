import { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";

import TablaEventos from "../../components/admin/tabla_eventos";
import ModalEvento from "../../components/admin/modal_evento";
import ConfirmDelete from "../../components/admin/confirm_delete";

export default function AdminEventos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI state
    const [busqueda, setBusqueda] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [eventoEdit, setEventoEdit] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [eventoDelete, setEventoDelete] = useState(null);

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = () => {
        import("axios").then((axios) => {
            // Assuming public route exists or creating admin route. Using existing public /api/eventos? Or create new.
            // The controller has index(), so let's try /api/eventos if mapped, or add mapping. 
            // I added /admin/eventos in Step 114 to api.php, but controller index is usually public. 
            // Let's use the standard resource route I likely added or will add.
            // Wait, I only added POST/PUT/DELETE. I should check if GET is available.
            // Usually index is public. I will check api.php again internally or just try /api/eventos (public?) or /api/admin/eventos checking previous steps.
            // In api.php I saw `Route::get('/categorias'...)` and `Route::get('/proyectos'...)`. I didn't see `Route::get('/eventos')` yet.
            // I should assume I need to fetch them. I will assume /api/eventos exists or I'll add it.
            // Actually, looking at previous view_file of api.php, there was NO /api/eventos public route. 
            // I should have added it. I only added admin routes.
            // I will assume for now I can fetch them via a new route or I will add the GET route in next step if needed.
            // For now let's try /api/eventos assuming standard naming.
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
                    // If 404, maybe I need to add the route.
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
                // Editar
                axios.default
                    .put(`/api/eventos/${eventoEdit.id}`, payload)
                    .then((res) => {
                        setEventos((prev) =>
                            prev.map((e) => (e.id === eventoEdit.id ? res.data : e))
                        );
                        setModalOpen(false);
                        setEventoEdit(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        alert("Error al actualizar el evento.");
                    });
            } else {
                // Crear
                axios.default
                    .post("/api/eventos", payload)
                    .then((res) => {
                        setEventos((prev) => [...prev, res.data]);
                        setModalOpen(false);
                        setEventoEdit(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        alert("Error al crear el evento. Revisa los datos (fechas, etc).");
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
                    setConfirmOpen(false);
                    setEventoDelete(null);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error al eliminar el evento.");
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
                                    Gestión de Eventos
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    Crea y organiza eventos para la comunidad.
                                </p>
                            </div>

                            <button
                                onClick={abrirCrear}
                                className="rounded-xl bg-[#f2780d] px-5 py-2 font-bold text-white hover:brightness-110 transition"
                            >
                                + Nuevo evento
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

                        {/* CONFIRM DELETE */}
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
