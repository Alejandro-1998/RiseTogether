// src/components/admin/ProyectoPendiente.jsx

export default function ProyectoPendiente({
  proyecto,
  onAprobar,
  onRechazar,
}) {
  if (!proyecto) return null;

  const {
    titulo = "Sin título",
    user,
    categoria,
    objetivo_financiacion = 0,
    estado = "revision",
    created_at,
  } = proyecto;

  const creadorNombre = user ? (user.nombreCompleto || user.nombreUsuario || "Desconocido") : "Desconocido";
  const categoriaNombre = categoria ? categoria.nombre : "Sin categoría";
  const fechaEnvio = created_at ? created_at.substring(0, 10) : "-";

  return (
    <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{titulo}</td>
      <td className="px-6 py-4">{creadorNombre}</td>
      <td className="px-6 py-4">{categoriaNombre}</td>
      <td className="px-6 py-4">{Number(objetivo_financiacion).toLocaleString('es-ES')} €</td>

      <td className="px-6 py-4">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          {estado === 'revision' ? 'Pendiente' : estado}
        </span>
      </td>

      <td className="px-6 py-4">{fechaEnvio}</td>

      <td className="px-6 py-4 text-right space-x-2">
        <button
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-2xl text-xs px-3 py-1.5 transition"
          onClick={() => onAprobar(proyecto.id)}
        >
          Aprobar
        </button>

        <button
          className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-2xl text-xs px-3 py-1.5 transition"
          onClick={() => onRechazar(proyecto.id)}
        >
          Rechazar
        </button>
      </td>
    </tr>
  );
}
