import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function FormularioRegistro() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
    password_confirmation: "",
    terminos: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const csrf = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = type === "checkbox" ? checked : value;

    if (name === "nombreUsuario") {
      newValue = value.replace(/[^a-zA-Z0-9]/g, "");
    } else if (name === "email") {
      newValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.nombreUsuario) {
      newErrors.nombreUsuario = ["El nombre de usuario es obligatorio."];
    } else if (!/^[a-zA-Z0-9]+$/.test(form.nombreUsuario)) {
      newErrors.nombreUsuario = ["El nombre de usuario solo puede contener letras y números."];
    } else if (form.nombreUsuario.length > 30) {
      newErrors.nombreUsuario = ["El nombre de usuario no puede tener más de 30 caracteres."];
    }

    if (!form.email) {
      newErrors.email = ["El email es obligatorio."];
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = ["El email no es válido."];
    }

    if (!form.password) {
      newErrors.password = ["La contraseña es obligatoria."];
    } else if (form.password.length < 8) {
      newErrors.password = ["La contraseña debe tener al menos 8 caracteres."];
    }

    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = ["Las contraseñas no coinciden."];
    }

    if (!form.terminos) {
      newErrors.terminos = ["Debes aceptar los términos y condiciones."];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError("");

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      await window.axios.get('/sanctum/csrf-cookie');

      const res = await window.axios.post("/api/registro", form);
      const data = res.data;

      if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        const from = location.state?.from || "/";
        navigate(from);
      }

    } catch (err) {
      if (err.response) {
        if (err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
        setGeneralError(err.response.data?.message || "No se pudo crear la cuenta.");
      } else {
        setGeneralError("Error de conexión. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ name }) => {
    if (!errors?.[name]?.length) return null;
    return (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
        {errors[name][0]}
      </p>
    );
  };

  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-[#9c7049] dark:text-[#a18a7a]">
          Registro
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">
          Crear cuenta
        </h1>
        <p className="mt-2 text-sm text-[#9c7049] dark:text-[#a18a7a]">
          Únete para crear campañas o apoyar proyectos en Rise Together.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {/* Nombre Usuario */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Nombre de Usuario</label>
          <div className="flex items-center gap-2 rounded-xl border border-[#e7d8cf] bg-[#fffaf7] px-3 py-2 dark:border-[#3a2d24] dark:bg-[#1a120d]">
            <span className="opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21a8 8 0 0 0-16 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              name="nombreUsuario"
              value={form.nombreUsuario}
              onChange={onChange}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#b59b8a]"
              placeholder="tu nombre de usuario"
              autoComplete="username"
              maxLength={30}
              required
            />
          </div>
          <FieldError name="nombreUsuario" />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Email</label>
          <div className="flex items-center gap-2 rounded-xl border border-[#e7d8cf] bg-[#fffaf7] px-3 py-2 dark:border-[#3a2d24] dark:bg-[#1a120d]">
            <span className="opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16v12H4V6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#b59b8a]"
              placeholder="correo"
              autoComplete="email"
              required
            />
          </div>
          <FieldError name="email" />
        </div>

        {/* Contraseña */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Contraseña</label>
          <div className="flex items-center gap-2 rounded-xl border border-[#e7d8cf] bg-[#fffaf7] px-3 py-2 dark:border-[#3a2d24] dark:bg-[#1a120d]">
            <span className="opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 11V8a5 5 0 0 0-10 0v3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 11h10v10H7V11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#b59b8a]"
              placeholder="contraseña"
              autoComplete="new-password"
              required
            />
          </div>
          <FieldError name="password" />
        </div>

        {/* Confirmación */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Repetir contraseña
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-[#e7d8cf] bg-[#fffaf7] px-3 py-2 dark:border-[#3a2d24] dark:bg-[#1a120d]">
            <span className="opacity-60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 11V8a5 5 0 0 0-10 0v3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 11h10v10H7V11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={onChange}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#b59b8a]"
              placeholder="repite contraseña"
              autoComplete="new-password"
              required
            />
          </div>
          <FieldError name="password_confirmation" />
        </div>

        {/* Terminos */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="terminos"
            checked={form.terminos}
            onChange={onChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#f97316] focus:ring-[#f97316]"
            required
          />
          <label className={`text-sm ${errors.terminos ? 'text-red-500' : 'text-[#9c7049] dark:text-[#a18a7a]'}`}>
            Acepto los <a href="#" className="underline">Términos y Condiciones</a> y la <a href="#" className="underline">Política de Privacidad</a>.
          </label>
        </div>
        <FieldError name="terminos" />

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-[#f97316] py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>



        {/* Link a login */}
        <p className="pt-4 text-center text-sm text-[#9c7049] dark:text-[#a18a7a]">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="font-semibold text-[#f97316] hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}