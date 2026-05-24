import { Calendar, ChevronRight, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { cn } from '@/utils/cn'

const STATUS_VARIANTS = {
  moderate: {
    label: 'Moderate',
    className: 'bg-orange-100 text-orange-600',
  },
  good: {
    label: 'Good',
    className: 'bg-green-100 text-green-600',
  },
  low: {
    label: 'Low',
    className: 'bg-amber-100 text-amber-600',
  },
}

export function DiagnosisCard({ plantName, condition, status, date, iconClassName }) {
  const statusStyle = STATUS_VARIANTS[status]

  return (
    <InteractiveCard hover="none" className="overflow-hidden rounded-xl bg-white">
      <div className="relative flex items-start gap-3 p-4">
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            iconClassName,
          )}
        >
          <Leaf className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1 pr-20">
          <h3 className="text-sm font-bold text-gray-900">{plantName}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{condition}</p>
        </div>

        <span
          className={cn(
            'absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            statusStyle.className,
          )}
        >
          {statusStyle.label}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {date}
        </p>
        <Button variant="ghost-link" className="h-auto gap-0.5 px-0 py-0">
          View Details
          <ChevronRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
    </InteractiveCard>
  )
}
