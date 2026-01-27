export default function TablaProyectos({ proyectos = [], onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <Th>Nombre</Th>
              <Th>Creador</Th>
              <Th>Categoría</Th>
              <Th>Cantidad recaudada</Th>
              <Th>Estado</Th>
              <Th>Fecha</Th>
              <Th className="text-right pr-6">Acciones</Th>
            </tr>
          </thead>

          <tbody>
            {proyectos.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-gray-600 dark:text-gray-300">
                  No hay proyectos para mostrar con esos filtros.
                </td>
              </tr>
            ) : (
              proyectos.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <td className="p-5 font-bold">{p.nombre}</td>
                  <td className="p-5">{p.creador}</td>
                  <td className="p-5">{p.categoria}</td>
                  <td className="p-5">{formatEUR(p.recaudado)}</td>
                  <td className="p-5">
                    <BadgeEstado estado={p.estado} />
                  </td>
                  <td className="p-5">{p.fecha_envio}</td>
                  <td className="p-5 pr-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit?.(p)}
                        className="rounded-xl px-4 py-2 bg-[#f2780d]/10 text-[#f2780d] font-bold hover:bg-[#f2780d]/20"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete?.(p)}
                        className="rounded-xl px-4 py-2 bg-red-600 text-white font-bold hover:brightness-110"
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`p-5 text-xs uppercase tracking-wide ${className}`}>{children}</th>;
}

function BadgeEstado({ estado }) {
  const norm = estado ? estado.toLowerCase() : "borrador";

  let cls = "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10";
  let label = "Borrador";

  // Map of states
  if (norm === "publicado" || norm === "activo") {
    cls = "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-300 border-green-200 dark:border-green-500/20";
    label = "Publicado";
  } else if (norm === "completado" || norm === "finalizado") {
    cls = "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/20";
    label = "Completado";
  } else if (norm === "revision" || norm === "pendiente") {
    cls = "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/20";
    label = "En revisión";
  } else if (norm === "fallido" || norm === "rechazado") {
    cls = "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-300 border-red-200 dark:border-red-500/20";
    label = "Fallido";
  } else if (norm === "cancelado") {
    cls = "bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-500/20";
    label = "Cancelado";
  } else if (norm === "borrador") {
    // Default
    label = "Borrador";
  } else {
    label = estado;
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${cls}`}>
      {label}
    </span>
  );
}

function formatEUR(n) {
  return (Number(n) || 0).toLocaleString("es-ES") + " €";
}
