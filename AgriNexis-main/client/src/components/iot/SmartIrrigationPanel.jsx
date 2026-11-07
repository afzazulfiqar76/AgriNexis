import { Clock, Droplets, Settings, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IRRIGATION_RECOMMENDATION } from '@/constants/irrigationRecommendation'
import { CARD_SURFACE, TRANSITION_UI } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function SmartIrrigationPanel() {
  const {
    statusBadge,
    scheduledTime,
    countdown,
    descriptionPrefix,
    waterAmount,
    descriptionSuffix,
  } = IRRIGATION_RECOMMENDATION

  return (
    <section
      aria-labelledby="irrigation-heading"
      className={cn(
        'rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/90 to-green-50/80 p-5 sm:p-6',
        TRANSITION_UI,
        'motion-safe:hover:border-emerald-200 motion-safe:hover:shadow-md motion-safe:hover:shadow-emerald-500/5',
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Droplets className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <h2
            id="irrigation-heading"
            className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl"
          >
            Smart Irrigation Recommendation
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">AI-powered watering schedule</p>
        </div>
      </div>

      <article className={cn(CARD_SURFACE, 'mt-5 p-5 ring-1 ring-emerald-50 sm:p-6')}>
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Zap className="size-5" strokeWidth={2} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                {statusBadge}
              </span>
              <span className="text-sm text-gray-600">{scheduledTime}</span>
            </div>

            <p className="mt-3 text-base font-bold text-gray-900 sm:text-lg">{countdown}</p>

            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              {descriptionPrefix}
              <strong className="font-semibold text-primary">{waterAmount}</strong>
              {descriptionSuffix}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button type="button" className="h-11 px-5 text-sm">
                <Settings className="size-4" strokeWidth={2} aria-hidden="true" />
                Adjust Schedule
              </Button>
              <Button type="button" variant="outline-emerald" className="h-11 px-5 text-sm">
                <Clock className="size-4" strokeWidth={2} aria-hidden="true" />
                View History
              </Button>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
