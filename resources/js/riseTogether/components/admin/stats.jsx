// src/components/admin/Stats.jsx

export default function Stats({ title, value, trend, trendColor = "text-green-600 dark:text-green-500" }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
      <p className="text-gray-700 dark:text-gray-300 text-base font-medium leading-normal">
        {title}
      </p>

      <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
        {value}
      </p>

      <p className={`${trendColor} text-sm font-medium leading-normal`}>{trend}</p>
    </div>
  );
}
