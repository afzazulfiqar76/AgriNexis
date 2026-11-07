import { cn } from '@/utils/cn'

export function FormTextarea({
  label,
  id,
  error,
  className,
  rows = 5,
  ...props
}) {
  const fieldId = id ?? props.name
  const errorId = error ? `${fieldId}-error` : undefined

  return (
    <div className="w-full space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block text-xs font-bold tracking-wide text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          'w-full resize-y rounded-xl border-0 bg-base-300 px-4 py-3 text-sm text-gray-900',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary/30',
          error && 'ring-2 ring-red-400/50',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
