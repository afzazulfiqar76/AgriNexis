import { SupportInfoCard } from '@/components/contact/SupportInfoCard'
import { CONTACT_PAGE, SUPPORT_INFO_CARDS } from '@/constants/contact'

export function ContactInfoPanel() {
  return (
    <aside aria-labelledby="support-center-heading" className="space-y-4">
      <div>
        <h2
          id="support-center-heading"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          {CONTACT_PAGE.infoPanelTitle}
        </h2>
        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-500">
          {CONTACT_PAGE.infoPanelSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        {SUPPORT_INFO_CARDS.map((card) => (
          <SupportInfoCard key={card.id} {...card} />
        ))}
      </div>
    </aside>
  )
}
