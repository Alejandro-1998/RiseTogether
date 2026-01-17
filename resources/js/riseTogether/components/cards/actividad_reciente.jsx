const colorMap = {
  blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
  red: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  green: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
  orange: "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
};

export default function ActividadReciente({
  icon = "add_circle",
  color = "blue",
  texto = "Actividad...",
  tiempo = "Hace un momento",
}) {
  const cls = colorMap[color] ?? colorMap.blue;

  return (
    <div className="flex items-start gap-4">
      <div className={`size-9 rounded-full flex items-center justify-center shrink-0 ${cls.split(" ").slice(0, 2).join(" ")}`}>
        <span className={`material-symbols-outlined text-xl ${cls.split(" ").slice(2).join(" ")}`}>
          {icon}
        </span>
      </div>

      <div>
        <p className="text-sm text-gray-800 dark:text-gray-200">{texto}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tiempo}</p>
      </div>
    </div>
  );
}

