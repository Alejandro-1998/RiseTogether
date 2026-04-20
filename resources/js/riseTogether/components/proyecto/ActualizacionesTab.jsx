import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

// Formateador de fecha similar al de ComentariosTab
const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const fechaObj = new Date(fecha);
    const ahora = new Date();
    const diffMs = ahora - fechaObj;
    const diffMin = Math.round(diffMs / 60000);
    const diffHoras = Math.round(diffMs / 3600000);
    const diffDias = Math.round(diffMs / 86400000);

    if (diffMin < 1) return "hace un momento";
    if (diffMin < 60) return `hace ${diffMin} minutos`;
    if (diffHoras < 24) return `hace ${diffHoras} horas`;
    if (diffDias === 1) return "ayer";
    if (diffDias < 30) return `hace ${diffDias} días`;

    return fechaObj.toLocaleDateString();
};

export default function ActualizacionesTab({ proyectoId, isOwner }) {
    const { isAuth, user } = useAuth();
    const [actualizaciones, setActualizaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Form state
    const [isCreating, setIsCreating] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Selected update for comments
    const [selectedUpdate, setSelectedUpdate] = useState(null);

    useEffect(() => {
        cargarActualizaciones();
    }, [proyectoId]);

    const cargarActualizaciones = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/proyectos/${proyectoId}/actualizaciones`);
            setActualizaciones(res.data);
        } catch (err) {
            console.error("Error cargando actualizaciones:", err);
            setError("No se pudieron cargar las actualizaciones.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUpdate = async (e) => {
        e.preventDefault();
        if (!titulo.trim() || !contenido.trim()) return;

        setSubmitting(true);
        try {
            await axios.post(`/api/proyectos/${proyectoId}/actualizaciones`, {
                titulo,
                contenido
            });
            setTitulo("");
            setContenido("");
            setIsCreating(false);
            cargarActualizaciones();
        } catch (err) {
            console.error("Error creando actualización:", err);
            alert("No se pudo publicar la actualización.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-6 text-center text-[#9c7049]">Cargando actualizaciones...</div>;

    return (
        <div className="flex flex-col gap-8">
            {/* Cabecera y botón de creación para el dueño */}
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white">Actualizaciones</h3>
                {isOwner && !isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="rounded-xl bg-[#f2780d] px-4 py-2 text-sm font-bold text-white hover:bg-[#d96600] transition-colors"
                    >
                        Nueva Actualización
                    </button>
                )}
            </div>

            {/* Formulario de creación */}
            {isCreating && (
                <div className="rounded-2xl bg-[#f4ede7] dark:bg-[#2a2017] p-6 border border-[#f2780d]/30">
                    <form onSubmit={handleCreateUpdate} className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-[#1c140d] dark:text-white">Publicar novedad</h4>
                            <button 
                                type="button" 
                                onClick={() => setIsCreating(false)}
                                className="text-sm text-[#9c7049] hover:text-[#1c140d] dark:hover:text-white"
                            >
                                Cancelar
                            </button>
                        </div>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Título de la actualización"
                            className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-white dark:bg-[#1a120d] p-3 text-sm font-bold text-[#1c140d] dark:text-gray-200 outline-none focus:border-[#f2780d] focus:ring-1 focus:ring-[#f2780d]"
                            required
                        />
                        <textarea
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            placeholder="¿Qué novedades tienes sobre el proyecto?"
                            className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-white dark:bg-[#1a120d] p-3 text-sm text-[#1c140d] dark:text-gray-200 outline-none focus:border-[#f2780d] focus:ring-1 focus:ring-[#f2780d]"
                            rows="5"
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting || !titulo.trim() || !contenido.trim()}
                                className="rounded-xl bg-[#f2780d] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#d96600] disabled:opacity-50"
                            >
                                {submitting ? "Publicando..." : "Publicar ahora"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de Actualizaciones */}
            <div className="flex flex-col gap-10">
                {actualizaciones.length > 0 ? (
                    actualizaciones.map((act) => (
                        <div key={act.id} className="group relative flex flex-col gap-4">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#f2780d]/20 group-hover:bg-[#f2780d]/40 transition-colors rounded-full"></div>
                            
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#f2780d] uppercase tracking-wider">Actualización</span>
                                    <span className="text-xs text-[#9c7049] dark:text-[#9c7049]/80">• {formatearFecha(act.created_at)}</span>
                                </div>
                                <h4 className="text-xl font-black text-[#1c140d] dark:text-white">{act.titulo}</h4>
                                <div className="text-[#5e4e42] dark:text-[#b0a8a0] text-base leading-relaxed whitespace-pre-wrap">
                                    {act.contenido}
                                </div>
                            </div>

                            {/* Botón para ver comentarios de esta actualización */}
                            <div className="flex items-center gap-4 mt-2 border-t border-[#f4ede7] dark:border-[#2a2017] pt-4">
                                <button
                                    onClick={() => setSelectedUpdate(selectedUpdate === act.id ? null : act.id)}
                                    className="flex items-center gap-2 text-sm font-bold text-[#9c7049] hover:text-[#f2780d] transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                    {selectedUpdate === act.id ? "Ocultar comentarios" : "Comentarios y respuestas"}
                                </button>
                            </div>

                            {selectedUpdate === act.id && (
                                <div className="mt-4 pl-4 border-l-2 border-[#f2780d]/10">
                                    <UpdateCommentsSection actualizacionId={act.id} proyectoId={proyectoId} />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 rounded-3xl border border-dashed border-[#e6dbd1] dark:border-[#3a2c20]">
                        <div className="flex justify-center mb-3">
                            <span className="material-symbols-outlined text-4xl text-[#9c7049]/40">history</span>
                        </div>
                        <p className="font-bold text-lg text-[#1c140d] dark:text-white">Sin novedades</p>
                        <p className="text-sm text-[#9c7049] mt-1">El creador aún no ha publicado ninguna actualización.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Componente interno para manejar los comentarios de una actualización específica
function UpdateCommentsSection({ actualizacionId, proyectoId }) {
    const { isAuth, user } = useAuth();
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        cargarComentarios();
    }, [actualizacionId]);

    const cargarComentarios = async () => {
        try {
            const res = await axios.get(`/api/actualizaciones/${actualizacionId}`);
            setComentarios(res.data.comentarios);
        } catch (err) {
            console.error("Error cargando comentarios de actualización:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mensaje.trim()) return;

        setSubmitting(true);
        try {
            await axios.post("/api/comentarios", {
                idProyecto: proyectoId,
                idActualizacion: actualizacionId,
                mensaje,
                fechaHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                estrellas: 5
            });
            setMensaje("");
            cargarComentarios();
        } catch (err) {
            console.error("Error enviando comentario:", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-xs text-[#9c7049]">Cargando comentarios...</div>;

    return (
        <div className="flex flex-col gap-6">
            {/* Formulario */}
            {isAuth ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <textarea
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Escribe un comentario sobre esta actualización..."
                        className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-[#ffffff] dark:bg-[#1a120d] p-3 text-sm text-[#1c140d] dark:text-gray-200 outline-none focus:border-[#f2780d] focus:ring-1 focus:ring-[#f2780d]"
                        rows="2"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting || !mensaje.trim()}
                            className="rounded-lg bg-[#f2780d] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#d96600] disabled:opacity-50"
                        >
                            Comentar
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-xs text-[#9c7049]">Inicia sesión para comentar esta novedad.</p>
            )}

            {/* Lista simple de comentarios (mejorable para soportar nesting si se desea) */}
            <div className="flex flex-col gap-4">
                {comentarios.map(c => (
                    <div key={c.id} className="flex gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-[#f2780d]/10 overflow-hidden">
                            {c.user?.profile_photo_url ? (
                                <img src={c.user.profile_photo_url} alt={c.user.nombreUsuario} className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-xs font-bold text-[#f2780d]">
                                    {c.user?.nombreUsuario?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xs font-bold text-[#1c140d] dark:text-white">{c.user?.nombreUsuario}</span>
                                <span className="text-[10px] text-[#9c7049]">{formatearFecha(c.created_at)}</span>
                            </div>
                            <p className="text-sm text-[#5e4e42] dark:text-[#b0a8a0]">{c.mensaje}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
