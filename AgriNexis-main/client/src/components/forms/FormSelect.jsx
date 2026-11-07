import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export function FormSelect({
  label,
  id,
  error,
  options,
  className,
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
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full appearance-none rounded-xl border-0 bg-base-300 py-3 pl-4 pr-10 text-sm text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-primary/30',
            error && 'ring-2 ring-red-400/50',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
