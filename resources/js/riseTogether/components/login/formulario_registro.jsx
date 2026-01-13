import { useState } from "react";

export default function FormularioRegistro() {
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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError("");

    try {
      await window.axios.get('/sanctum/csrf-cookie');

      const res = await window.axios.post("/api/registro", form);
      const data = res.data;

      // Success logic adapted for axios response structure
      if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        window.location.href = "/";
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

      {generalError ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">
          {generalError}
        </div>
      ) : null}

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
          <label className="text-sm text-[#9c7049] dark:text-[#a18a7a]">
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

        {/* Separador */}
        <div className="pt-4 text-center text-xs text-[#9c7049] dark:text-[#a18a7a]">
          o continúa con
        </div>

        {/* BOTONES SOCIALES */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f4ede7] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f4ede7]/50 dark:border-[#2a2017] dark:bg-[#2a2017] dark:hover:bg-[#2a2017]/80"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f4ede7] bg-white px-3 py-2 text-sm font-semibold hover:bg-[#f4ede7]/50 dark:border-[#2a2017] dark:bg-[#2a2017] dark:hover:bg-[#2a2017]/80"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            GitHub
          </button>
        </div>

        {/* Link a login */}
        <p className="pt-4 text-center text-sm text-[#9c7049] dark:text-[#a18a7a]">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="font-semibold text-[#f97316] hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}