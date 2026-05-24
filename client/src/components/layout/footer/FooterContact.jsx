import { Mail, MapPin } from 'lucide-react'
import { FooterColumn } from '@/components/layout/footer/FooterColumn'
import { FooterSocialLinks } from '@/components/layout/footer/FooterSocialLinks'
import { FOOTER_CONTACT } from '@/constants/footer'
import { FOOTER_HEADING, FOOTER_LINK, FOOTER_TEXT } from '@/constants/uiClasses'

export function FooterContact() {
  return (
    <FooterColumn title={FOOTER_CONTACT.title}>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-3">
          <span className="flex shrink-0 rounded-lg bg-slate-800/80 p-2">
            <Mail className="size-4 text-emerald-400" strokeWidth={2} aria-hidden="true" />
          </span>
          <a href={`mailto:${FOOTER_CONTACT.email}`} className={FOOTER_LINK}>
            {FOOTER_CONTACT.email}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex shrink-0 rounded-lg bg-slate-800/80 p-2">
            <MapPin className="size-4 text-emerald-400" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className={FOOTER_TEXT}>{FOOTER_CONTACT.location}</span>
        </li>
      </ul>

      <div className="flex flex-col gap-4 pt-1">
        <h4 className={FOOTER_HEADING}>Follow us</h4>
        <FooterSocialLinks />
      </div>
    </FooterColumn>
  )
}
