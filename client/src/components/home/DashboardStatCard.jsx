import { cn } from '@/utils/cn'

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
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gray-100 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]',
        cardClassName,
      )}
    >
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
          className={cn('mt-3 h-2 overflow-hidden rounded-full', progressTrackClassName)}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} progress`}
        >
          <div
            className={cn('h-full rounded-full transition-all', progressClassName)}
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
    </article>
  )
}
