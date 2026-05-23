import { NotificationBell } from '@/components/layout/navbar/NotificationBell'
import { UserProfile } from '@/components/layout/navbar/UserProfile'

export function NavbarActions({ compact = false }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NotificationBell />
      <div className="hidden h-8 w-px bg-gray-200 sm:block" aria-hidden="true" />
      <UserProfile compact={compact} />
    </div>
  )
}
