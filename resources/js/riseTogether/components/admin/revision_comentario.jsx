// src/components/admin/RevisionComentario.jsx

export default function RevisionComentario({
  proyecto = "Dron ecológico",
  usuario = "@eco_fan21",
  motivo = "Lenguaje ofensivo",
  fecha = "2025-10-26",
  onRestaurar,
  onEliminar,
}) {
  return (
    <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{proyecto}</td>
      <td className="px-4 py-3">{usuario}</td>
      <td className="px-4 py-3">{motivo}</td>
      <td className="px-4 py-3 whitespace-nowrap">{fecha}</td>

      <td className="px-4 py-3 text-right space-x-2">
        <button
          className="text-xs px-3 py-1.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white"
          onClick={onRestaurar}
        >
          Restaurar
        </button>

        <button
          className="text-xs px-3 py-1.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white"
          onClick={onEliminar}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
