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
  const map = {
    pendiente: "bg-yellow-500/20 text-yellow-300",
    activo: "bg-green-500/20 text-green-300",
    rechazado: "bg-red-500/20 text-red-300",
    finalizado: "bg-gray-500/20 text-gray-200",
  };

  const cls = map[estado] ?? "bg-gray-500/20 text-gray-200";
  const label =
    estado === "pendiente"
      ? "Pendiente"
      : estado === "activo"
      ? "Activo"
      : estado === "rechazado"
      ? "Rechazado"
      : estado === "finalizado"
      ? "Finalizado"
      : estado;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
      {label}
    </span>
  );
}

function formatEUR(n) {
  return (Number(n) || 0).toLocaleString("es-ES") + " €";
}
