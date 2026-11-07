import { cn } from '@/utils/cn'

export function DocumentationSidebar({ sections, activeSectionId, onNavigate, className }) {
  return (
    <nav
      aria-label="Documentation sections"
      className={cn('flex flex-col gap-1', className)}
    >
      {sections.map((section) => {
        const isActive = activeSectionId === section.id

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault()
              onNavigate(section.id)
            }}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ease-out',
              isActive
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            )}
          >
            {section.title}
          </a>
        )
      })}
    </nav>
  )
}
