import { cn } from '@/utils/cn'
import { TRANSITION_UI } from '@/constants/uiClasses'

const ALERT_VARIANTS = {
  warning: {
    container: 'border-orange-200 bg-orange-50 hover:border-orange-300 hover:shadow-md',
    icon: 'text-orange-500',
  },
  success: {
    container: 'border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md',
    icon: 'text-green-600',
  },
  info: {
    container: 'border-sky-200 bg-sky-50 hover:border-sky-300 hover:shadow-md',
    icon: 'text-sky-500',
  },
}

export function AlertItem({ variant, message, timeAgo, icon }) {
  const styles = ALERT_VARIANTS[variant]

  return (
    <article
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4',
        TRANSITION_UI,
        styles.container,
      )}
    >
      <span className={cn('mt-0.5 shrink-0', styles.icon)}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-gray-900">{message}</p>
        <p className="mt-1 text-xs text-gray-500">{timeAgo}</p>
      </div>
    </article>
  )
}
