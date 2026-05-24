import { Button } from '@/components/ui/Button'
import { NotificationEmptyState } from '@/components/layout/navbar/NotificationEmptyState'
import { NotificationItem } from '@/components/layout/navbar/NotificationItem'
import { CARD_SHADOW } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function NotificationDropdown({
  open,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAll,
  onClose,
}) {
  if (!open) return null

  return (
    <div
      id="notification-dropdown"
      role="dialog"
      aria-label="Notifications"
      className={cn(
        'absolute right-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] backdrop-blur-md motion-safe:animate-dropdown-in sm:w-96',
        CARD_SHADOW,
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="shrink-0 text-xs font-medium text-primary transition-colors hover:text-emerald-700"
          >
            Mark all read
          </button>
        )}
      </header>

      {notifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <div className="max-h-80 divide-y divide-gray-100 overflow-y-auto">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkAsRead}
            />
          ))}
        </div>
      )}

      <footer className="border-t border-gray-100 p-3">
        <Button
          type="button"
          variant="secondary"
          className="h-10 w-full text-sm"
          onClick={() => {
            onClose()
            onViewAll()
          }}
        >
          View All Notifications
        </Button>
      </footer>
    </div>
  )
}
