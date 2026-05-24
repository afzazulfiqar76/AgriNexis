import { Cloud, Droplets, Sun, Thermometer } from 'lucide-react'
import { LiveDataIndicator } from '@/components/iot/LiveDataIndicator'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  droplets: Droplets,
  thermometer: Thermometer,
  cloud: Cloud,
  sun: Sun,
}

export function SensorStatCard({
  label,
  value,
  unit,
  status,
  icon,
  cardClassName,
  iconClassName,
  statusClassName,
}) {
  const Icon = ICON_MAP[icon] ?? Droplets

  return (
    <InteractiveCard
      hover="none"
      className={cn('relative overflow-hidden rounded-3xl p-5 sm:p-6', cardClassName)}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-xl',
            iconClassName,
          )}
        >
          <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            statusClassName,
          )}
        >
          {status}
        </span>
      </div>

      <p className="mt-5 text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
        {value}
        {unit && <span className="text-2xl font-semibold">{unit}</span>}
      </p>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <LiveDataIndicator />
      </div>
    </InteractiveCard>
  )
}
