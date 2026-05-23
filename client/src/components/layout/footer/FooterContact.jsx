import { Mail, MapPin } from 'lucide-react'
import { FOOTER_CONTACT } from '@/constants/footer'
import { FooterSocialLinks } from '@/components/layout/footer/FooterSocialLinks'

export function FooterContact() {
  return (
    <div className="flex min-w-[180px] flex-col gap-4">
      <h3 className="text-sm font-semibold text-emerald-400">{FOOTER_CONTACT.title}</h3>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-3">
          <Mail className="size-4 shrink-0 text-emerald-400" strokeWidth={2} aria-hidden="true" />
          <a
            href={`mailto:${FOOTER_CONTACT.email}`}
            className="text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
          >
            {FOOTER_CONTACT.email}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <MapPin className="size-4 shrink-0 text-emerald-400" strokeWidth={2} aria-hidden="true" />
          <span className="text-sm text-slate-400">{FOOTER_CONTACT.location}</span>
        </li>
      </ul>
      <FooterSocialLinks />
    </div>
  )
}
