import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { ProfileMenu } from '@/components/profile/ProfileMenu'
import { ADMIN_PAGE_TITLES } from '@/constants/adminNavigation'

export function AdminNavbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const meta = ADMIN_PAGE_TITLES[pathname] ?? { title: 'Admin', subtitle: '' }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
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
        <ProfileMenu />
      </div>
    </header>
  )
}
