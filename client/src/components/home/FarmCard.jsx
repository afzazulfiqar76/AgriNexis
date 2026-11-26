import { ChevronRight, Leaf, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { PROGRESS_FILL, PROGRESS_TRACK } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function FarmCard({
  name,
  type,
  location,
  plantCount,
  healthScore,
  accentClassName,
  onViewDetails,
}) {
  return (
    <InteractiveCard
      hover="action"
      className={cn('overflow-hidden border-t-4 bg-white', accentClassName)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {type}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          {location}
        </p>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Leaf className="size-4 text-primary" strokeWidth={2} aria-hidden="true" />
            Plants
          </div>
          <span className="text-sm font-bold text-gray-900">{plantCount}</span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Health Score</span>
            <span className="font-semibold text-primary">{healthScore}%</span>
          </div>
          <div
            className={cn(PROGRESS_TRACK, 'mt-2 bg-gray-200')}
            role="progressbar"
            aria-valuenow={healthScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${name} health score`}
          >
            <div
              className={cn(PROGRESS_FILL, 'bg-gray-900')}
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={onViewDetails}
          className="mt-5 h-10 w-full gap-1 text-sm font-medium"
        >
          View Details
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
    </InteractiveCard>
  )
}
