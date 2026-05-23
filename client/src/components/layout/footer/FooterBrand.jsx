import { Link } from 'react-router-dom'
import { AgriNexisLogo } from '@/components/shared/AgriNexisLogo'
import { FOOTER_BRAND } from '@/constants/footer'
import { ROUTES } from '@/constants/routes'

export function FooterBrand() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Link
        to={ROUTES.HOME}
        className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
      >
        <AgriNexisLogo />
        <span className="text-lg font-bold text-white">AgriNexis</span>
      </Link>
      <p className="text-sm leading-relaxed text-slate-400">{FOOTER_BRAND.description}</p>
    </div>
  )
}
