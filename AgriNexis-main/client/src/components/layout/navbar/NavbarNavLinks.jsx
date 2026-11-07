import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { NavbarLink } from '@/components/layout/navbar/NavbarLink'

function isNavItemActive(pathname, to) {
  if (to === ROUTES.HOME) {
    return pathname === ROUTES.HOME || pathname === ROUTES.DASHBOARD
  }
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function NavbarNavLinks({ onLinkClick, className = '' }) {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Main"
      className={`flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1 ${className}`}
    >
      {NAV_ITEMS.map((item) => (
        <NavbarLink
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isActive={isNavItemActive(pathname, item.to)}
          onClick={onLinkClick}
        />
      ))}
    </nav>
  )
}
