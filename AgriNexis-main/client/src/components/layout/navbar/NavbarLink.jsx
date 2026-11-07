import { Link } from 'react-router-dom'
import { NAV_ITEM, NAV_ITEM_ACTIVE, NAV_ITEM_IDLE } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function NavbarLink({ to, icon: Icon, label, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(NAV_ITEM, isActive ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE)}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  )
}
