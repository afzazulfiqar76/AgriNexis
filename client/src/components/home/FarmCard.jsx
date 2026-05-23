import { ChevronRight, Leaf, MapPin } from 'lucide-react'
import { cn } from '@/utils/cn'

export function FarmCard({
  name,
  type,
  location,
  plantCount,
  healthScore,
  accentClassName,
}) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border border-gray-100 border-t-4 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]',
        accentClassName,
      )}
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
            className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
            aria-valuenow={healthScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${name} health score`}
          >
            <div
              className="h-full rounded-full bg-gray-900 transition-all"
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex h-10 w-full items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          View Details
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
