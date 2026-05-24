import { Outlet } from 'react-router-dom'
import { AdminNavbar } from '@/components/admin/layout/AdminNavbar'
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar'
import { useAdminSidebar } from '@/hooks/useAdminSidebar'
import { cn } from '@/utils/cn'

export function AdminLayout() {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile, closeMobile } =
    useAdminSidebar()

  return (
    <div className="flex min-h-dvh bg-base-200">
      <div className="hidden lg:flex lg:shrink-0">
        <AdminSidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {isMobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <AdminSidebar
              isCollapsed={false}
              onToggleCollapse={toggleCollapse}
              onNavigate={closeMobile}
            />
          </div>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar onMenuClick={toggleMobile} />
        <main className={cn('flex-1 p-4 sm:p-6 lg:p-8')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
