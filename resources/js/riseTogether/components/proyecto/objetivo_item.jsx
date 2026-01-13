export default function ObjetivoItem({ value, index, onChange, onRemove }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });

  return (
    <div className="rounded-2xl border border-[#f4ede7] dark:border-[#2a2017] p-5 bg-[#fcfaf8] dark:bg-[#120b07]">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-bold text-[#9c7049] dark:text-[#9c7049]/80">
          Objetivo #{index + 1}
        </p>

        <button
          type="button"
          onClick={onRemove}
          className="text-sm font-bold text-red-600 hover:opacity-80"
        >
          Eliminar
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold">Cantidad (€)</label>
          <input
            type="number"
            value={value.cantidad}
            onChange={set("cantidad")}
            className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-white dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Título</label>
          <input
            value={value.titulo}
            onChange={set("titulo")}
            placeholder="Ej: Miniaturas premium"
            className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-white dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Descripción</label>
        <textarea
          rows={3}
          value={value.descripcion}
          onChange={set("descripcion")}
          placeholder="Qué se desbloquea con este objetivo."
          className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-white dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
        />
      </div>
    </div>
  );
}