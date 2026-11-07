import { FAQCategoryTabs } from '@/components/faq/FAQCategoryTabs'
import { FAQPageHero } from '@/components/faq/FAQPageHero'
import { FAQSearchBar } from '@/components/faq/FAQSearchBar'
import { FAQSection } from '@/components/faq/FAQSection'
import { HelpCard } from '@/components/faq/HelpCard'
import { useFaqPage } from '@/hooks/useFaqPage'

export function FaqsPage() {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setCategory,
    openFaqId,
    toggleFaq,
    filteredFaqs,
  } = useFaqPage()

  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
          <FAQPageHero />
          <FAQSearchBar value={searchQuery} onChange={setSearchQuery} />
          <FAQCategoryTabs activeCategory={activeCategory} onSelect={setCategory} />
          <FAQSection items={filteredFaqs} openFaqId={openFaqId} onToggle={toggleFaq} />
          <HelpCard />
        </div>
      </div>
    </div>
  )
}
