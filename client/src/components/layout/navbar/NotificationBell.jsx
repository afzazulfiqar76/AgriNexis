import { Bell } from 'lucide-react'
import { BTN_ICON } from '@/constants/uiClasses'
import { NOTIFICATION_COUNT } from '@/constants/navigation'
import { cn } from '@/utils/cn'

export function NotificationBell() {
  return (
    <button
      type="button"
      className={cn(BTN_ICON, 'relative size-10 text-gray-700')}
      aria-label={`${NOTIFICATION_COUNT} unread notifications`}
    >
      <Bell className="size-5" strokeWidth={2} aria-hidden="true" />
      {NOTIFICATION_COUNT > 0 && (
        <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white motion-safe:animate-pulse">
          {NOTIFICATION_COUNT}
        </span>
      )}
    </button>
  )
}
