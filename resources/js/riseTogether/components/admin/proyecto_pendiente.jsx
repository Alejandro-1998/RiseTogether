// src/components/admin/ProyectoPendiente.jsx

export default function ProyectoPendiente({
  proyecto = "Dron ecológico",
  creador = "Rafael de la Fuente",
  categoria = "Tecnología",
  objetivo = "45.000 €",
  estado = "Pendiente",
  fecha = "2025-10-26",
  onAprobar,
  onRechazar,
}) {
  return (
    <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{proyecto}</td>
      <td className="px-6 py-4">{creador}</td>
      <td className="px-6 py-4">{categoria}</td>
      <td className="px-6 py-4">{objetivo}</td>

      <td className="px-6 py-4">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          {estado}
        </span>
      </td>

      <td className="px-6 py-4">{fecha}</td>

      <td className="px-6 py-4 text-right space-x-2">
        <button
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-2xl text-xs px-3 py-1.5"
          onClick={onAprobar}
        >
          Aprobar
        </button>

        <button
          className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-2xl text-xs px-3 py-1.5"
          onClick={onRechazar}
        >
          Rechazar
        </button>
      </td>
    </tr>
  );
}
