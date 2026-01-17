export default function EstadisticasUsuario({ value = "12", label = "Proyectos creados" }) {
  return (
    <div className="flex min-w-[120px] flex-1 flex-col gap-1 rounded-2xl border border-[#e8dace] dark:border-[#374151] p-3 items-start bg-white dark:bg-[#2d2d2d] shadow-sm">
      <p className="text-2xl font-bold leading-tight">{value}</p>
      <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-normal">{label}</p>
    </div>
  );
}
