import useAuth from "../../hooks/useAuth";


export default function RecompensaCard({ recompensa, onSupport, isFinished = false }) {
  const { isAuth } = useAuth();
  const precio = recompensa?.costoRecompensa ?? recompensa?.precio ?? 10;
  const titulo = recompensa?.nombreRecompensa ?? recompensa?.titulo ?? "Aportación de apoyo";
  const descripcion = recompensa?.descripcionRecompensa ?? recompensa?.descripcion ?? "Descripción de recompensa...";

  const isBlocked = !!recompensa?.deleted_at;

  const handleSupport = () => {
    if (isFinished || isBlocked) return;
    if (!isAuth) {
      window.location.href = "/login";
      return;
    }
    if (onSupport) {
      onSupport();
    }
  };

  return (
    <div className={`rounded-2xl border p-5 transition-all flex flex-col h-full bg-white dark:bg-[#1a120d] ${isBlocked ? 'opacity-60 grayscale border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50' : 'border-[#f4ede7] dark:border-[#f4ede7]/10 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50'}`}>
      <div className="flex-1 relative">
        <div className="flex justify-between items-start">
          <p className="text-2xl font-bold text-[#1c140d] dark:text-white">{precio} €</p>
          {isBlocked && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Bloqueada</span>
          )}
        </div>
        <p className="mt-1 font-bold text-[#1c140d] dark:text-white">{titulo}</p>
        <p className="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80 whitespace-pre-line">{descripcion}</p>
      </div>

      <button
        onClick={handleSupport}
        disabled={isFinished || isBlocked}
        className={`mt-4 px-4 h-10 w-full rounded-2xl text-sm font-bold shadow-sm transition-colors ${
          isBlocked
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
            : isFinished 
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-[#f2780d] text-white hover:bg-[#f2780d]/90 cursor-pointer'
        }`}
      >
        {isBlocked ? 'No disponible' : (isFinished ? 'Financiación finalizada' : 'Seleccionar esta recompensa')}
      </button>
    </div>
  );
}
