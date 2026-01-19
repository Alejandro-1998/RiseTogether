export default function ConfirmDelete({ open, titulo, descripcion, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-200 dark:border-gray-800 p-6 shadow-xl">
        <h3 className="text-xl font-bold">{titulo}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{descripcion}</p>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="rounded-xl px-4 py-2 bg-gray-200 dark:bg-white/10 font-bold"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl px-4 py-2 bg-red-600 text-white font-bold hover:brightness-110"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
