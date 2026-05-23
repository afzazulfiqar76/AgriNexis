import { Link } from 'react-router-dom'
import { AgriNexisLogo } from '@/components/shared/AgriNexisLogo'
import { ROUTES } from '@/constants/routes'

export function NavbarBrand() {
  return (
    <Link
      to={ROUTES.HOME}
      className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      <AgriNexisLogo />
      <div className="min-w-0">
        <p className="truncate text-lg font-bold leading-tight text-emerald-900 sm:text-xl">
          AgriNexis
        </p>
        <p className="hidden truncate text-xs text-gray-500 sm:block">
          AI-Powered Urban Farming Ecosystem
        </p>
      </div>
    </Link>
  )
}
