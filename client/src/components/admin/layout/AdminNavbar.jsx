import { useLocation } from 'react-router-dom'
import { LogOut, Menu, Search } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { ADMIN_PAGE_TITLES } from '@/constants/adminNavigation'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { BTN_GHOST } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function AdminNavbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const meta = ADMIN_PAGE_TITLES[pathname] ?? { title: 'Admin', subtitle: '' }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex size-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" strokeWidth={2} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-gray-900">{meta.title}</h1>
          {meta.subtitle && (
            <p className="hidden truncate text-xs text-gray-500 sm:block">{meta.subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 md:flex">
          <Search className="size-4" aria-hidden="true" />
          <span className="text-xs">Quick search (soon)</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Avatar initials={user?.initials ?? 'AU'} />
          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.roleLabel}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout()
            window.location.href = ROUTES.SIGN_IN
          }}
          className={cn(BTN_GHOST, 'gap-1.5 px-2')}
          aria-label="Sign out"
        >
          <LogOut className="size-4" strokeWidth={2} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
