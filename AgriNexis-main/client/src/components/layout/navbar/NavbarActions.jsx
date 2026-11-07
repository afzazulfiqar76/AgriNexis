import { useAuth } from '@/contexts/AuthContext'
import { AuthGuestButton } from '@/components/layout/navbar/AuthGuestButton'
import { NotificationBell } from '@/components/layout/navbar/NotificationBell'
import { ProfileMenu } from '@/components/profile/ProfileMenu'

export function NavbarActions({ compact = false }) {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NotificationBell />
      <div className="hidden h-8 w-px bg-gray-200 sm:block" aria-hidden="true" />
      {isAuthenticated ? <ProfileMenu compact={compact} /> : <AuthGuestButton />}
    </div>
  )
}
