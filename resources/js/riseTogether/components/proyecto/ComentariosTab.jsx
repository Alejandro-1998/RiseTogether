import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

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

const CommentItem = ({
    comentario,
    isReply = false,
    depth = 0,
    isAuth,
    replyingTo,
    setReplyingTo,
    replyMensaje,
    setReplyMensaje,
    onSubmit,
    submitting
}) => {
    const [showReplies, setShowReplies] = useState(false);
    const hasReplies = comentario.comentarios_respuesta && comentario.comentarios_respuesta.length > 0;

    return (
        <div className={`flex flex-col gap-2 ${isReply ? 'mt-3 pt-3 border-t border-[#eceae8] dark:border-[#3a2c20]' : 'p-4 bg-white dark:bg-[#1a120d] rounded-2xl border border-[#eceae8] dark:border-[#3a2c20]'}`}>
            <div className="flex gap-3">
                {/* Column for Avatar and Vertical Line */}
                <div className="flex flex-col items-center">
                    <div className={`${isReply ? 'h-8 w-8' : 'h-10 w-10'} shrink-0 overflow-hidden rounded-full bg-[#f2780d]/10 z-10`}>
                        {comentario.user?.profile_photo_url ? (
                            <img src={comentario.user.profile_photo_url} alt={comentario.user.nombreUsuario} className="h-full w-full object-cover" />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center text-lg font-bold text-[#f2780d]">
                                {comentario.user?.nombreUsuario?.charAt(0).toUpperCase() ?? "?"}
                            </span>
                        )}
                    </div>
                    {/* Vertical Thread Line */}
                    {showReplies && hasReplies && (
                        <div className="w-0.5 flex-1 bg-[#f2780d]/20 mt-2 mb-2 rounded-full"></div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1c140d] dark:text-white">
                                {comentario.user?.nombreUsuario ?? "Usuario desconocido"}
                            </span>
                            <span className="text-xs text-[#9c7049] dark:text-[#9c7049]/80">
                                {formatearFecha(comentario.created_at)}
                            </span>
                        </div>
                    </div>
                    <p className="text-[#5e4e42] dark:text-[#b0a8a0] text-sm leading-relaxed whitespace-pre-wrap">
                        {comentario.mensaje}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                        {/* Toggle Replies Button */}
                        {hasReplies && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="group flex items-center gap-1.5 text-xs font-semibold text-[#9c7049] hover:text-[#f2780d] transition-colors"
                            >
                                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[#f2780d]/10 group-hover:bg-[#f2780d]/20 transition-colors">
                                    <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${showReplies ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </div>
                                <span className="opacity-90 group-hover:opacity-100">
                                    {showReplies ? 'Ocultar' : `${comentario.comentarios_respuesta.length} respuestas`}
                                </span>
                            </button>
                        )}

                        {/* Reply Button */}
                        {isAuth && (
                            <button
                                onClick={() => {
                                    setReplyingTo(replyingTo === comentario.id ? null : comentario.id);
                                    setReplyMensaje("");
                                }}
                                className="text-xs font-bold text-[#f2780d] hover:text-[#d96600] transition-colors"
                            >
                                Responder
                            </button>
                        )}
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comentario.id && (
                        <form onSubmit={(e) => onSubmit(e, comentario.id)} className="mt-3 flex flex-col gap-2">
                            <div className="flex-1">
                                <textarea
                                    value={replyMensaje}
                                    onChange={(e) => setReplyMensaje(e.target.value)}
                                    placeholder={`Respondiendo a ${comentario.user?.nombreUsuario}...`}
                                    className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-white dark:bg-[#1a120d] p-3 text-sm text-[#1c140d] dark:text-gray-200 outline-none focus:border-[#f2780d] focus:ring-1 focus:ring-[#f2780d]"
                                    rows="2"
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setReplyingTo(null)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#9c7049] hover:bg-gray-100 dark:hover:bg-white/5"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !replyMensaje.trim()}
                                    className="rounded-lg bg-[#f2780d] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#d96600] disabled:opacity-50"
                                >
                                    Responder
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Nested Replies */}
                    {showReplies && hasReplies && (
                        <div className="mt-3 flex flex-col pl-2">
                            {comentario.comentarios_respuesta.map(respuesta => (
                                <CommentItem
                                    key={respuesta.id}
                                    comentario={respuesta}
                                    isReply={true}
                                    depth={depth + 1}
                                    isAuth={isAuth}
                                    replyingTo={replyingTo}
                                    setReplyingTo={setReplyingTo}
                                    replyMensaje={replyMensaje}
                                    setReplyMensaje={setReplyMensaje}
                                    onSubmit={onSubmit}
                                    submitting={submitting}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ComentariosTab({ proyectoId }) {
    const { user, isAuth } = useAuth();
    const [comentarios, setComentarios] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Reply state
    const [replyingTo, setReplyingTo] = useState(null); // id of comment being replied to
    const [replyMensaje, setReplyMensaje] = useState("");

    useEffect(() => {
        cargarComentarios();
    }, [proyectoId]);

    const cargarComentarios = async () => {
        try {
            const res = await axios.get(`/api/proyectos/${proyectoId}/comentarios`);
            setComentarios(res.data);
        } catch (err) {
            console.error("Error cargando comentarios:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e, parentId = null) => {
        e.preventDefault();
        const texto = parentId ? replyMensaje : mensaje;

        if (!texto.trim()) return;

        setSubmitting(true);
        setError("");

        try {
            await axios.post("/api/comentarios", {
                idProyecto: proyectoId,
                idComentario: parentId,
                mensaje: texto,
                fechaHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
                estrellas: 5,
            });

            if (parentId) {
                setReplyingTo(null);
                setReplyMensaje("");
            } else {
                setMensaje("");
            }

            cargarComentarios(); // Recargar lista
        } catch (err) {
            console.error("Error enviando comentario:", err);
            setError("No se pudo enviar el comentario. Inténtalo de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-6 text-center text-[#9c7049]">Cargando comentarios...</div>;

    return (
        <div className="flex flex-col gap-8">
            {/* Formulario Principal */}
            <div className="rounded-2xl bg-[#f4ede7] dark:bg-[#2a2017] p-6">
                {isAuth ? (
                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f2780d]/10">
                                {user?.profile_photo_url ? (
                                    <img src={user.profile_photo_url} alt={user.nombreUsuario} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center text-lg font-bold text-[#f2780d]">
                                        {user?.nombreUsuario?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    placeholder="Escribe un comentario..."
                                    className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-white dark:bg-[#1a120d] p-3 text-sm text-[#1c140d] dark:text-gray-200 outline-none focus:border-[#f2780d] focus:ring-1 focus:ring-[#f2780d]"
                                    rows="3"
                                />
                                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting || !mensaje.trim()}
                                className="rounded-xl bg-[#f2780d] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#d96600] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Publicando..." : "Publicar comentario"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                        <p className="text-[#1c140d] dark:text-white font-medium">
                            Para poder publicar comentarios, debes iniciar sesión.
                        </p>
                        <Link to="/login" className="text-[#f2780d] font-bold hover:underline">
                            Iniciar sesión
                        </Link>
                    </div>
                )}
            </div>

            {/* Lista de Comentarios */}
            <div className="flex flex-col gap-6">
                {comentarios.length > 0 ? (
                    comentarios.map((comentario) => (
                        <CommentItem
                            key={comentario.id}
                            comentario={comentario}
                            isAuth={isAuth}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            replyMensaje={replyMensaje}
                            setReplyMensaje={setReplyMensaje}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 rounded-2xl border border-dashed border-[#e6dbd1] dark:border-[#3a2c20]">
                        <p className="font-bold text-lg text-[#1c140d] dark:text-white">Comentarios</p>
                        <p className="text-sm text-[#9c7049] mt-1">Sé el primero en dejar un comentario.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
