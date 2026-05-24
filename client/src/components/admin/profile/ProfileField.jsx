export function ProfileField({ label, value, children }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
      <div className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
        {children ?? (value || '—')}
      </div>
    </div>
  )
}
