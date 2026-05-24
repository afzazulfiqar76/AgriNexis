import { PrivacyPolicyPageHero } from '@/components/legal/PrivacyPolicyPageHero'
import { PrivacyPolicySection } from '@/components/legal/PrivacyPolicySection'
import { PrivacyPolicyTableOfContents } from '@/components/legal/PrivacyPolicyTableOfContents'
import { PRIVACY_SECTIONS } from '@/constants/privacyPolicyContent'

export function PrivacyPolicyPage() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <PrivacyPolicyPageHero />

        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          <PrivacyPolicyTableOfContents sections={PRIVACY_SECTIONS} />

          {PRIVACY_SECTIONS.map((section, index) => (
            <PrivacyPolicySection key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
