export function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full rounded-2xl bg-base-100 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="p-6 sm:p-8 lg:p-10">
        <header className="mb-6 space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </header>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  )
}
