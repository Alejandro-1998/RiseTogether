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

      <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
        <button
          className="rounded-xl px-4 py-2 text-sm bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
          onClick={onRestaurar}
        >
          Aprobar
        </button>

        <button
          className="rounded-xl px-4 py-2 text-sm bg-red-600/10 text-red-600 border border-red-600/20 font-bold hover:bg-red-600 hover:text-white transition-colors"
          onClick={onEliminar}
        >
          Rechazar
        </button>
      </td>
    </tr>
  );
}
