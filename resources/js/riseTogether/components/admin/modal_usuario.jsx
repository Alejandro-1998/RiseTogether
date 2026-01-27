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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-100 dark:border-gray-800 text-left shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {usuario ? "Editar usuario" : "Crear usuario"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Rellena los datos para {usuario ? "actualizar" : "registrar"} el usuario.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nombre de usuario
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all"
              placeholder="Ej: nombreUsuario"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all"
              placeholder="Ej: usuario@risetogether.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rol
              </label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all appearance-none"
              >
                <option value="Usuario">Usuario</option>
                <option value="Admin">Administrador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all appearance-none"
              >
                <option value="Activo">Activo</option>
                <option value="Bloqueado">Bloqueado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl font-semibold bg-[#f2780d] text-white hover:brightness-110 shadow-lg shadow-orange-500/30 transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
