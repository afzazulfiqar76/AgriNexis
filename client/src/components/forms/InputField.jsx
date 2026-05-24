import { cn } from '@/utils/cn'

export function InputField({
  label,
  leftIcon,
  rightSlot,
  id,
  error,
  className,
  ...props
}) {
  const inputId = id ?? props.name
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="w-full space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-xs font-bold tracking-wide text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full rounded-xl border-0 bg-base-300 py-3 text-sm text-gray-900',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-primary/30',
            leftIcon ? 'pl-10' : 'px-4',
            rightSlot ? 'pr-10' : leftIcon ? 'pr-4' : '',
            error && 'ring-2 ring-red-400/50',
            className,
          )}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
