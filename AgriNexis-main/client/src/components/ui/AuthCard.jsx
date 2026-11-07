import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function AuthCard({ title, subtitle, children }) {
  return (
    <InteractiveCard hover="none" className="w-full bg-base-100">
      <div className="p-6 sm:p-8 lg:p-10">
        <header className="mb-6 space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </header>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </InteractiveCard>
  )
}