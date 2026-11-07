import { cn } from '@/utils/cn'
import { PROGRESS_FILL, PROGRESS_TRACK } from '@/constants/uiClasses'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function DashboardStatCard({
  label,
  value,
  footer,
  footerClassName,
  footerHighlightClassName,
  cardClassName,
  valueClassName,
  icon,
  iconClassName,
  progress,
  progressClassName,
  progressTrackClassName,
}) {
  return (
    <InteractiveCard hover="none" className={cn('relative p-5', cardClassName)}>
      <span
        className={cn(
          'absolute right-5 top-5 flex size-10 items-center justify-center rounded-xl',
          iconClassName,
        )}
      >
        {icon}
      </span>

      <p className="text-sm text-gray-500">{label}</p>
      <p className={cn('mt-2 text-3xl font-bold tracking-tight', valueClassName)}>
        {value}
      </p>

      {progress != null && (
        <div
          className={cn(PROGRESS_TRACK, 'mt-3', progressTrackClassName)}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} progress`}
        >
          <div
            className={cn(PROGRESS_FILL, progressClassName)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {footer && (
        <p className={cn('mt-2 text-sm', footerClassName)}>
          {typeof footer === 'object' && footer !== null ? (
            <>
              {footer.prefix}
              <span className={footerHighlightClassName}>{footer.highlight}</span>
            </>
          ) : (
            footer
          )}
        </p>
      )}
    </InteractiveCard>
  )
}
