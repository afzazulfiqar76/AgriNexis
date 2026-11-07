import { useCallback, useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NotificationDropdown } from '@/components/layout/navbar/NotificationDropdown'
import { ROUTES } from '@/constants/routes'
import { BTN_ICON } from '@/constants/uiClasses'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useNotificationState } from '@/hooks/useNotificationState'
import { cn } from '@/utils/cn'

function formatBadgeCount(count) {
  if (count > 9) return '9+'
  return String(count)
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationState()

  const close = useCallback(() => setOpen(false), [])

  useClickOutside(containerRef, close, open)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  function handleViewAll() {
    navigate(ROUTES.HOME)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={cn(
          BTN_ICON,
          'relative size-10 text-gray-700',
          open && 'bg-gray-100/80',
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="notification-dropdown"
        aria-label={
          unreadCount > 0
            ? `${unreadCount} unread notifications`
            : 'Notifications'
        }
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell className="size-5" strokeWidth={2} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex size-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[10px] font-bold text-white motion-safe:animate-pulse">
            {formatBadgeCount(unreadCount)}
          </span>
        )}
      </button>

      <NotificationDropdown
        open={open}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onViewAll={handleViewAll}
        onClose={close}
      />
    </div>
  )
}
