import { BarChart3 } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function ChartPlaceholder({ title, description }) {
  return (
    <InteractiveCard hover="none" className="flex min-h-[240px] flex-col items-center justify-center p-8 text-center">
      <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <BarChart3 className="size-6" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="font-semibold text-gray-900">{title}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      <p className="mt-4 text-xs text-gray-400">Chart integration coming soon</p>
    </InteractiveCard>
  )
}
