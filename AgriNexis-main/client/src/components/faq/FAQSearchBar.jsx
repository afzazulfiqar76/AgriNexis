import { Search } from 'lucide-react'
import { FAQ_PAGE } from '@/constants/faqContent'

export function FAQSearchBar({ value, onChange }) {
  return (
    <label className="relative block">
      <span className="sr-only">Search FAQs</span>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={FAQ_PAGE.searchPlaceholder}
        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  )
}
