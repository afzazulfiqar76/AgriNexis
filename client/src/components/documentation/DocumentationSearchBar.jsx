import { Search } from 'lucide-react'

export function DocumentationSearchBar({ value, onChange, placeholder }) {
  return (
    <label className="relative block">
      <span className="sr-only">Search documentation</span>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input input-bordered h-11 w-full rounded-xl border-gray-200 bg-white pl-10 text-sm text-gray-900 shadow-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  )
}
