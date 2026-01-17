export default function RecompensaCard({ recompensa }) {
  const precio = recompensa?.precio ?? 10;
  const titulo = recompensa?.titulo ?? "Aportación de apoyo";
  const descripcion = recompensa?.descripcion ?? "Descripción de recompensa...";

  return (
    <div className="rounded-2xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-5 hover:border-[#f2780d]/50 dark:hover:border-[#f2780d]/50 transition-all">
      <p className="text-2xl font-bold text-[#1c140d] dark:text-white">{precio} €</p>
      <p className="mt-1 font-bold text-[#1c140d] dark:text-white">{titulo}</p>
      <p className="mt-2 text-sm text-[#9c7049] dark:text-[#9c7049]/80">{descripcion}</p>

      <button className="mt-4 px-4 h-10 w-full rounded-2xl bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white text-sm font-bold hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20 transition-colors">
        Seleccionar esta recompensa
      </button>
    </div>
  );
}
