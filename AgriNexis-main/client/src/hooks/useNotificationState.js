import { useCallback, useMemo, useState } from 'react'
import { INITIAL_NOTIFICATIONS } from '@/constants/notifications'

export function useNotificationState(initialNotifications = INITIAL_NOTIFICATIONS) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  )

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}
