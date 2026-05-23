import { Bell } from 'lucide-react'
import { NOTIFICATION_COUNT } from '@/constants/navigation'

export function NotificationBell() {
  return (
    <button
      type="button"
      className="relative flex size-10 items-center justify-center rounded-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      aria-label={`${NOTIFICATION_COUNT} unread notifications`}
    >
      <Bell className="size-5" strokeWidth={2} aria-hidden="true" />
      {NOTIFICATION_COUNT > 0 && (
        <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {NOTIFICATION_COUNT}
        </span>
      )}
    </button>
  )
}
