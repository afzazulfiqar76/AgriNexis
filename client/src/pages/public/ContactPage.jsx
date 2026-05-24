import { ContactFormCard } from '@/components/contact/ContactFormCard'
import { ContactInfoPanel } from '@/components/contact/ContactInfoPanel'
import { ContactPageHero } from '@/components/contact/ContactPageHero'

export function ContactPage() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <ContactPageHero />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <ContactFormCard />
          <ContactInfoPanel />
        </div>
      </div>
    </div>
  )
}
