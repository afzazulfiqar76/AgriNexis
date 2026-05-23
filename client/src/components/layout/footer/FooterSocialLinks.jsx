import { FOOTER_SOCIAL_LINKS } from '@/constants/footer'

export function FooterSocialLinks() {
  return (
    <div className="flex items-center gap-3 pt-1">
      {FOOTER_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex size-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all duration-300 ease-out hover:scale-110 hover:bg-slate-700 hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
        >
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
