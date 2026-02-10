import { useEffect, useState } from "react";

export default function ModalCategoria({ open, onClose, categoria, onSave }) {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (categoria) {
            setNombre(categoria.nombre || "");
        } else {
            setNombre("");
        }
    }, [categoria, open]);

    if (!open) return null;

    const handleSave = () => {
        if (!nombre.trim()) return;
        onSave?.({
            nombre: nombre.trim(),
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
            <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-100 dark:border-gray-800 text-left shadow-2xl">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {categoria ? "Editar categoría" : "Crear categoría"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {categoria ? "Modifica el nombre de la categoría." : "Introduce el nombre de la nueva categoría."}
                    </p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Nombre
                        </label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all"
                            placeholder="Ej: Tecnología, Salud..."
                            autoFocus
                        />
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
