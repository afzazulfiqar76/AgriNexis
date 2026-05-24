import { Minus, Plus } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { cn } from '@/utils/cn'

export function FAQAccordion({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`
  const headerId = `faq-header-${item.id}`

  return (
    <InteractiveCard hover="none" className="overflow-hidden p-0">
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(item.id)}
        className="flex min-h-11 w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 sm:p-6"
      >
        <span className="text-sm font-semibold text-gray-900 sm:text-base">
          {item.question}
        </span>
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full bg-base-300 text-gray-700 transition-all duration-300 motion-safe:rotate-0',
            isOpen && 'bg-primary/10 text-primary motion-safe:rotate-180',
          )}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="size-4" strokeWidth={2.5} />
          ) : (
            <Plus className="size-4" strokeWidth={2.5} />
          )}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-gray-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-600 sm:px-6 sm:pb-6">
            {item.answer}
          </p>
        </div>
      </div>
    </InteractiveCard>
  )
}
