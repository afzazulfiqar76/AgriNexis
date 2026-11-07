import { ContactForm } from '@/components/contact/ContactForm'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { CONTACT_PAGE } from '@/constants/contact'

export function ContactFormCard() {
  return (
    <InteractiveCard panel hover="none" className="p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {CONTACT_PAGE.formTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {CONTACT_PAGE.formHelper}
        </p>
      </div>
      <ContactForm />
    </InteractiveCard>
  )
}
