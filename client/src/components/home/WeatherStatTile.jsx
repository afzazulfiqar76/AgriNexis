export function WeatherStatTile({ label, value, icon, iconBg, iconColor }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center">
      <span
        className={`flex size-10 items-center justify-center rounded-xl ${iconBg}`}
      >
        <span className={iconColor}>{icon}</span>
      </span>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  )
}
