export default function UsuarioTabs({ tab, setTab }) {
  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "creados", label: "Proyectos creados" },
    { id: "apoyados", label: "Proyectos apoyados" },
    { id: "actividad", label: "Actividad" },
    { id: "ajustes", label: "Ajustes" },
  ];

  return (
    <div className="border-b border-[#e8dace] dark:border-[#374151]">
      <div className="flex gap-4 sm:gap-8 overflow-x-auto" role="tablist">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                active
                  ? "flex flex-col items-center justify-center border-b-[3px] border-b-[#f2780d] shrink-0 pb-[13px] pt-4"
                  : "flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6b7280] dark:text-[#9ca3af] hover:border-b-[#f2780d]/50 hover:text-[#1a1a1a] dark:hover:text-[#f0f0f0] shrink-0 pb-[13px] pt-4"
              }
              role="tab"
              aria-selected={active}
            >
              <p className="text-sm font-bold tracking-[0.015em]">{t.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
