import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AdminNavItem } from '@/components/admin/layout/AdminNavItem'
import { AgriNexisLogo } from '@/components/shared/AgriNexisLogo'
import { ADMIN_NAV_ITEMS } from '@/constants/adminNavigation'
import { ADMIN_ROUTES } from '@/constants/adminRoutes'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

export function AdminSidebar({ isCollapsed, onToggleCollapse, onNavigate, className }) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-gray-200/80 bg-white/95 backdrop-blur-md',
        isCollapsed ? 'w-[72px]' : 'w-64',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center border-b border-gray-100 px-4 py-5',
          isCollapsed ? 'justify-center' : 'gap-3',
        )}
      >
        <Link
          to={ADMIN_ROUTES.DASHBOARD}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <AgriNexisLogo />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-emerald-900">AgriNexis</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => (
          <AdminNavItem
            key={item.to}
            {...item}
            isCollapsed={isCollapsed}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-gray-100 p-3">
        {!isCollapsed && (
          <Link
            to={ROUTES.HOME}
            onClick={onNavigate}
            className="mb-2 block rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Back to site
          </Link>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100',
            isCollapsed && 'px-2',
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
