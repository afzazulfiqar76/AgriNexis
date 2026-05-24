import { Link } from 'react-router-dom'
import { AgriNexisLogo } from '@/components/shared/AgriNexisLogo'
import { FOOTER_BRAND } from '@/constants/footer'
import { FOOTER_TEXT } from '@/constants/uiClasses'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

export function FooterBrand({ className }) {
  return (
    <div className={cn('flex max-w-xs flex-col gap-5 lg:max-w-sm', className)}>
      <Link
        to={ROUTES.HOME}
        className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
      >
        <AgriNexisLogo />
        <span className="text-xl font-bold text-white">AgriNexis</span>
      </Link>
      <p className={FOOTER_TEXT}>{FOOTER_BRAND.description}</p>
    </div>
  )
}
