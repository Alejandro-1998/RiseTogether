import { useEffect, useState } from "react";

export default function ModalEvento({ open, onClose, evento, onSave }) {
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [cantidadMaxParticipantes, setCantidadMaxParticipantes] = useState("");
    const [idFinalidad, setIdFinalidad] = useState(""); // Assuming simple input for now or select if we had data

    useEffect(() => {
        if (evento) {
            setNombre(evento.nombre || "");
            setFechaInicio(evento.fechaInicio || "");
            setFechaFinal(evento.fechaFinal || "");
            setCantidadMaxParticipantes(evento.cantidadMaxParticipantes || "");
            setIdFinalidad(evento.idFinalidad || "1"); // Default to 1 for now if missing
        } else {
            setNombre("");
            setFechaInicio("");
            setFechaFinal("");
            setCantidadMaxParticipantes("");
            setIdFinalidad("1");
        }
    }, [evento, open]);

    if (!open) return null;

    const handleSave = () => {
        if (!nombre.trim() || !fechaInicio || !fechaFinal) return;
        onSave?.({
            nombre: nombre.trim(),
            fechaInicio,
            fechaFinal,
            cantidadMaxParticipantes: cantidadMaxParticipantes || null,
            idFinalidad: idFinalidad || 1, // Ensure ID is sent
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-100 dark:border-gray-800 text-left shadow-2xl">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {evento ? "Editar evento" : "Crear evento"}
                    </h3>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Nombre del Evento
                        </label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Fecha Inicio
                            </label>
                            <input
                                type="datetime-local"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Fecha Final
                            </label>
                            <input
                                type="datetime-local"
                                value={fechaFinal}
                                onChange={(e) => setFechaFinal(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Max. Participantes
                            </label>
                            <input
                                type="number"
                                value={cantidadMaxParticipantes}
                                onChange={(e) => setCantidadMaxParticipantes(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                ID Finalidad (Ref)
                            </label>
                            <input
                                type="number"
                                value={idFinalidad}
                                onChange={(e) => setIdFinalidad(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 rounded-xl font-semibold bg-[#f2780d] text-white hover:brightness-110 shadow-lg shadow-orange-500/30 transition"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
