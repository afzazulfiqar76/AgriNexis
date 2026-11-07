import { FAQAccordion } from '@/components/faq/FAQAccordion'
import { FAQ_PAGE } from '@/constants/faqContent'

export function FAQSection({ items, openFaqId, onToggle }) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-600 shadow-sm">
        {FAQ_PAGE.emptySearch}
      </p>
    )
  }

  return (
    <section aria-label="FAQ list" className="space-y-3">
      {items.map((item) => (
        <FAQAccordion
          key={item.id}
          item={item}
          isOpen={openFaqId === item.id}
          onToggle={onToggle}
        />
      ))}
    </section>
  )
}
