export default function TablaCategorias({ categorias = [], onEdit, onDelete }) {
    return (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/50 dark:bg-white/5">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-[#f2780d]/20 dark:bg-[#f2780d]/10 text-[#1e293b] dark:text-[#f2780d]">
                        <tr className="text-left">
                            <th className="px-6 py-4 text-sm font-extrabold">ID</th>
                            <th className="px-6 py-4 text-sm font-extrabold">NOMBRE</th>
                            <th className="px-6 py-4 text-sm font-extrabold">SLUG</th>
                            <th className="px-6 py-4 text-sm font-extrabold text-right">ACCIONES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.length === 0 ? (
                            <tr>
                                <td className="px-6 py-10 text-center opacity-70" colSpan={4}>
                                    No hay categorías disponibles.
                                </td>
                            </tr>
                        ) : (
                            categorias.map((c) => (
                                <tr
                                    key={c.id}
                                    className="border-t border-black/10 dark:border-white/10"
                                >
                                    <td className="px-6 py-5 opacity-70">#{c.id}</td>
                                    <td className="px-6 py-5 font-bold">{c.nombre}</td>
                                    <td className="px-6 py-5 opacity-70 font-mono text-sm">{c.slug}</td>

                                    <td className="px-6 py-5">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => onEdit?.(c)}
                                                className="px-4 py-2 rounded-xl font-bold bg-[#ff7a00]/20 text-[#ffb066] hover:opacity-90 text-sm"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => onDelete?.(c)}
                                                className="px-4 py-2 rounded-xl font-bold bg-red-600 text-white hover:opacity-90 text-sm"
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
