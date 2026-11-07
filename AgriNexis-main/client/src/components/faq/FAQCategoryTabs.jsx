import { FAQ_CATEGORIES } from '@/constants/faqContent'
import { cn } from '@/utils/cn'

export function FAQCategoryTabs({ activeCategory, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="FAQ categories"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {FAQ_CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(category.id)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2',
              isActive
                ? 'bg-primary text-white shadow-sm shadow-primary/20'
                : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm',
            )}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}
