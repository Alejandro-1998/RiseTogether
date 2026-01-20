import { useEffect, useState } from "react";

export default function ModalProyecto({ open, modo, proyecto, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: "",
    creador: "",
    categoria: "",
    recaudado: 0,
    estado: "pendiente",
  });

  useEffect(() => {
    if (!open) return;
    if (modo === "edit" && proyecto) {
      setForm({
        nombre: proyecto.nombre ?? "",
        creador: proyecto.creador ?? "",
        categoria: proyecto.categoria ?? "",
        recaudado: proyecto.recaudado ?? 0,
        estado: proyecto.estado ?? "pendiente",
      });
    } else {
      setForm({ nombre: "", creador: "", categoria: "", recaudado: 0, estado: "pendiente" });
    }
  }, [open, modo, proyecto]);

  if (!open) return null;

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onSave?.(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-200 dark:border-gray-800 p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold">
              {modo === "create" ? "Crear proyecto" : "Editar proyecto"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Rellena los campos y guarda los cambios.
            </p>
          </div>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Nombre del proyecto">
            <input
              value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              className="w-full rounded-xl px-3 py-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 outline-none"
              required
            />
          </Field>

          <Field label="Creador">
            <input
              value={form.creador}
              onChange={(e) => set("creador", e.target.value)}
              className="w-full rounded-xl px-3 py-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 outline-none"
              required
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Categoría">
              <input
                value={form.categoria}
                onChange={(e) => set("categoria", e.target.value)}
                className="w-full rounded-xl px-3 py-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 outline-none"
                required
              />
            </Field>

            <Field label="Recaudado (€)">
              <input
                type="number"
                value={form.recaudado}
                onChange={(e) => set("recaudado", e.target.value)}
                className="w-full rounded-xl px-3 py-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 outline-none"
                min={0}
              />
            </Field>
          </div>

          <Field label="Estado">
            <select
              value={form.estado}
              onChange={(e) => set("estado", e.target.value)}
              className="w-full rounded-xl px-3 py-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 outline-none"
            >
              <option value="pendiente">Pendiente</option>
              <option value="activo">Activo</option>
              <option value="rechazado">Rechazado</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 bg-gray-200 dark:bg-white/10 font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl px-4 py-2 bg-[#f2780d] text-white font-bold hover:brightness-110"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
