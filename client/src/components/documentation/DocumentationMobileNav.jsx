import { cn } from '@/utils/cn'

export function DocumentationMobileNav({ sections, activeSectionId, onNavigate }) {
  return (
    <nav
      aria-label="Documentation sections"
      className="flex gap-2 overflow-x-auto pb-1 lg:hidden"
    >
      {sections.map((section) => {
        const isActive = activeSectionId === section.id

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300',
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50',
            )}
          >
            {section.title}
          </button>
        )
      })}
    </nav>
  )
}
