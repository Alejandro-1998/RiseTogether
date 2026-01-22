import useAuth from "../../hooks/useAuth";


export default function RecompensaCard({ recompensa, onSupport }) {
  const { isAuth } = useAuth();
  const precio = recompensa?.costoRecompensa ?? recompensa?.precio ?? 10;
  const titulo = recompensa?.nombreRecompensa ?? recompensa?.titulo ?? "Aportación de apoyo";
  const descripcion = recompensa?.descripcionRecompensa ?? recompensa?.descripcion ?? "Descripción de recompensa...";

  const handleSupport = () => {
    if (!isAuth) {
      window.location.href = "/login";
      return;
    }
    if (onSupport) {
      onSupport();
    }
  };

  return (
    <div className="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all flex flex-col h-full bg-white dark:bg-[#1a120d]">
      <div className="flex-1">
        <p className="text-2xl font-bold text-[#1c140d] dark:text-white">{precio} €</p>
        <p className="mt-1 font-bold text-[#1c140d] dark:text-white">{titulo}</p>
        <p className="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">{descripcion}</p>
      </div>

      <button
        onClick={handleSupport}
        className="cursor-pointer mt-4 px-4 h-10 w-full rounded-2xl bg-[#f2780d] text-white text-sm font-bold hover:bg-[#f2780d]/90 transition-colors shadow-sm"
      >
        Seleccionar esta recompensa
      </button>
    </div>
  );
}
