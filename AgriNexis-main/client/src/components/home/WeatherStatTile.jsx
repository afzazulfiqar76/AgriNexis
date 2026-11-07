import { CARD_HOVER_SUBTLE, CARD_SURFACE } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function WeatherStatTile({ label, value, icon, iconBg, iconColor }) {
  return (
    <div
      className={cn(
        CARD_SURFACE,
        CARD_HOVER_SUBTLE,
        'flex flex-col items-center gap-2 rounded-xl p-4 text-center',
      )}
    >
      <span
        className={cn('flex size-10 items-center justify-center rounded-xl', iconBg)}
      >
        <span className={iconColor}>{icon}</span>
      </span>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  )
}
