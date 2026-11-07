import { Link } from 'react-router-dom'
import { Globe, LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import { PROFILE_DROPDOWN_ITEM, PROFILE_DROPDOWN_ITEM_DANGER } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  user: User,
  settings: Settings,
  layoutDashboard: LayoutDashboard,
  globe: Globe,
  logOut: LogOut,
}

export function DropdownItem({ icon, label, to, onClick, variant = 'default' }) {
  const Icon = ICON_MAP[icon] ?? User
  const className = cn(
    variant === 'danger' ? PROFILE_DROPDOWN_ITEM_DANGER : PROFILE_DROPDOWN_ITEM,
  )

  const content = (
    <>
      <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} role="menuitem" className={className} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" role="menuitem" className={className} onClick={onClick}>
      {content}
    </button>
  )
}
