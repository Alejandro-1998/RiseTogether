export default function ActividadReciente() {
  return (
    <div className="flex items-start gap-4">
      <div className="size-9 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">
          add_circle
        </span>
      </div>

      <div>
        <p className="text-sm text-gray-800 dark:text-gray-200">
          Se ha enviado el nuevo proyecto «Dron ecológico».
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Hace 2 minutos
        </p>
      </div>
    </div>
  );
}
