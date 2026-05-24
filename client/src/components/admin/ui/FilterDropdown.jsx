import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export function FilterDropdown({ label, value, onChange, options, className }) {
  return (
    <label className={cn('block', className)}>
      {label && (
        <span className="mb-1.5 block text-xs font-bold tracking-wide text-gray-600">
          {label}
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 min-w-[140px] appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
      </div>
    </label>
  )
}
