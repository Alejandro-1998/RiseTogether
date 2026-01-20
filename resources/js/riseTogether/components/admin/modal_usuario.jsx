// resources/js/riseTogether/components/admin/modal_usuario.jsx
import { useEffect, useState } from "react";

export default function ModalUsuario({ open, onClose, usuario, onSave }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("Usuario");
  const [estado, setEstado] = useState("Activo");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setEmail(usuario.email || "");
      setRol(usuario.rol || "Usuario");
      setEstado(usuario.estado || "Activo");
    } else {
      setNombre("");
      setEmail("");
      setRol("Usuario");
      setEstado("Activo");
    }
  }, [usuario, open]);

  if (!open) return null;

  const handleSave = () => {
    if (!nombre.trim() || !email.trim()) return;
    onSave?.({
      nombre: nombre.trim(),
      email: email.trim(),
      rol,
      estado,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/10 bg-[#0f1626] text-white shadow-xl">
        <div className="p-6 border-b border-white/10">
          <p className="text-xl font-extrabold">
            {usuario ? "Editar usuario" : "Crear usuario"}
          </p>
          <p className="text-sm opacity-70 mt-1">
            Rellena los datos y guarda los cambios.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-bold opacity-80">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none"
              placeholder="Ej: Santi"
            />
          </div>

          <div>
            <label className="text-sm font-bold opacity-80">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none"
              placeholder="Ej: santi@risetogether.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold opacity-80">Rol</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none"
              >
                <option>Admin</option>
                <option>Creador</option>
                <option>Usuario</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold opacity-80">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none"
              >
                <option>Activo</option>
                <option>Pendiente</option>
                <option>Bloqueado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-white/10 hover:opacity-90"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl font-bold bg-[#ff7a00] hover:opacity-90"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
