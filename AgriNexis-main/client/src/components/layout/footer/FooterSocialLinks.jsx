import { FOOTER_SOCIAL_LINKS } from '@/constants/footer'
import { FOOTER_SOCIAL } from '@/constants/uiClasses'

export function FooterSocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {FOOTER_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} aria-label={label} className={FOOTER_SOCIAL}>
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
