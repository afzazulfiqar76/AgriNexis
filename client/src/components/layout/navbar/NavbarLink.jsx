import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function NavbarLink({ to, icon: Icon, label, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
        isActive
          ? 'bg-slate-900 text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  )
}
