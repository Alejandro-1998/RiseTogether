// resources/js/riseTogether/components/admin/tabla_usuarios.jsx
export default function TablaUsuarios({ usuarios = [], onEdit, onDelete }) {
  const badgeEstado = (estado) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold inline-flex";
    if (estado === "Activo") return `${base} bg-green-500/15 text-green-400`;
    if (estado === "Pendiente") return `${base} bg-yellow-500/15 text-yellow-300`;
    if (estado === "Bloqueado") return `${base} bg-red-500/15 text-red-400`;
    return `${base} bg-white/10 text-white`;
  };

  const badgeRol = (rol) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold inline-flex border";
    if (rol === "Admin") return `${base} bg-[#ff7a00]/10 text-[#ff7a00] border-[#ff7a00]/20`;
    if (rol === "Usuario") return `${base} bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-500/20`;
    return `${base} bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10`;
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/50 dark:bg-white/5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#1a2538]/95 text-white">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-extrabold">NOMBRE</th>
              <th className="px-6 py-4 text-sm font-extrabold">EMAIL</th>
              <th className="px-6 py-4 text-sm font-extrabold">ROL</th>
              <th className="px-6 py-4 text-sm font-extrabold">ESTADO</th>
              <th className="px-6 py-4 text-sm font-extrabold">FECHA</th>
              <th className="px-6 py-4 text-sm font-extrabold text-right">
                ACCIONES
              </th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td className="px-6 py-10 text-center opacity-70" colSpan={6}>
                  No hay usuarios con esos filtros.
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-black/10 dark:border-white/10"
                >
                  <td className="px-6 py-5 font-semibold">{u.nombre}</td>
                  <td className="px-6 py-5 opacity-90">{u.email}</td>
                  <td className="px-6 py-5">
                    <span className={badgeRol(u.rol)}>{u.rol}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={badgeEstado(u.estado)}>{u.estado}</span>
                  </td>
                  <td className="px-6 py-5">{u.fecha}</td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onEdit?.(u)}
                        className="px-5 py-2 rounded-xl font-bold bg-[#ff7a00]/20 text-[#ffb066] hover:opacity-90"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete?.(u)}
                        className="px-5 py-2 rounded-xl font-bold bg-red-600 text-white hover:opacity-90"
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
