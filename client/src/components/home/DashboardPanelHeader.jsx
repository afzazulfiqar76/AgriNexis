export function DashboardPanelHeader({ title, icon, headerClassName, iconClassName }) {
  return (
    <header
      className={`flex items-center gap-3 rounded-t-2xl px-5 py-4 ${headerClassName}`}
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
      >
        {icon}
      </span>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </header>
  )
}
