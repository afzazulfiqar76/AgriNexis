import { AlertCircle, AlertTriangle, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const VARIANT_STYLES = {
  success: {
    shell: 'border-emerald-200/70 bg-white',
    iconWrap: 'bg-emerald-50 text-emerald-600',
    Icon: CheckCircle2,
  },
  error: {
    shell: 'border-red-200/70 bg-white',
    iconWrap: 'bg-red-50 text-red-600',
    Icon: AlertCircle,
  },
  warning: {
    shell: 'border-amber-200/70 bg-white',
    iconWrap: 'bg-amber-50 text-amber-600',
    Icon: AlertTriangle,
  },
}

export function AuthToast({ variant = 'error', message, visible, onDismiss }) {
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.error
  const Icon = styles.Icon

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex w-[min(20rem,calc(100vw-2rem))] items-center gap-2.5',
        'rounded-xl border px-3 py-2.5 shadow-sm shadow-black/[0.04]',
        'motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0.5',
        styles.shell,
      )}
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-lg',
          styles.iconWrap,
        )}
      >
        <Icon className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <p className="flex-1 text-[13px] leading-snug font-medium text-gray-800">
        {message}
      </p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
