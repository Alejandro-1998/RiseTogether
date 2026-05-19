import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function FormularioLoginInicio() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const { login, errors: authErrors } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido.";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      await login({ email, password });

      // Si es exitoso, redirigimos logic is handled by awaiting login success
      const from = location.state?.from || "/";
      navigate(from);

    } catch (err) {
      // Errors are set in context, but we can also set local generic error or read from hook
      if (err.response && err.response.status === 401) {
        setError("Credenciales incorrectas.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }
      console.error(err);
    }
  };

  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-[#9c7049] dark:text-[#a18a7a]">
          Acceso
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-sm text-[#9c7049] dark:text-[#a18a7a]">
          Entra en tu cuenta para crear campañas o apoyar proyectos.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>

          <div className="relative mt-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">
              mail
            </span>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="correo"
              value={email}
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, "");
                setEmail(newValue);
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
              }}
              className={`h-8 w-full rounded-lg border-none bg-[#f4ede7] pl-10 text-[#1c140d] placeholder:text-[#b28155] focus:ring-2 focus:ring-[#f2780d] dark:bg-[#6a513b] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a] ${fieldErrors.email ? 'ring-2 ring-red-500' : ''}`}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-medium">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>

          <div className="relative mt-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9c7049] dark:text-[#a18a7a]">
              lock
            </span>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
              }}
              className={`h-8 w-full rounded-lg border-none bg-[#f4ede7] pl-10 text-[#1c140d] placeholder:text-[#9c7049] focus:ring-2 focus:ring-[#f2780d] dark:bg-[#6a513b] dark:text-[#fcfaf8] dark:placeholder:text-[#a18a7a] ${fieldErrors.password ? 'ring-2 ring-red-500' : ''}`}
            />
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-medium">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* RECUÉRDAME + OLVIDASTE */}
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="remember"
              className="border-[#9c7049] text-[#f2780d] focus:ring-[#f2780d] dark:border-[#a18a7a]"
            />
            Recuérdame
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#f2780d] hover:opacity-80"
          >
            ¿Olvidaste la contraseña?
          </Link>
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#f2780d] px-4 py-3 font-bold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2780d]"
        >
          Entrar
        </button>



        {/* LINK A REGISTRO */}
        <p className="text-center text-sm text-[#9c7049] dark:text-[#a18a7a]">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/registro" className="font-bold text-[#f2780d] hover:opacity-80">
            Crea una
          </Link>
        </p>
      </form>
    </div>
  );
}
