import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function AdminNavItem({ to, label, icon: Icon, isCollapsed, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          isActive
            ? 'bg-primary/10 text-primary shadow-sm'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          isCollapsed && 'justify-center px-2',
        )
      }
    >
      <Icon className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  )
}
