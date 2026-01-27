export default function ConfirmDelete({ open, titulo, descripcion, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-100 dark:border-gray-800 p-6 text-left shadow-2xl transition-all sm:my-8 text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <span className="material-symbols-outlined text-3xl text-red-600 dark:text-red-500">
            warning
          </span>
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold leading-6 text-gray-900 dark:text-white mb-2">
          {titulo || "Confirmar eliminación"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {descripcion || "¿Estás seguro de que quieres realizar esta acción? No se puede deshacer."}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl px-4 py-2.5 bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg shadow-red-600/30 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
