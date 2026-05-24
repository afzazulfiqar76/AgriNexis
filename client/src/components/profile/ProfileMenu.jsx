import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfileDropdown } from '@/components/profile/ProfileDropdown'
import { Avatar } from '@/components/ui/Avatar'
import { FARMER_MOCK_USER } from '@/constants/auth'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'

export function ProfileMenu({ compact = false }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const profile = user ?? FARMER_MOCK_USER

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

  function handleLogout() {
    logout()
    navigate(ROUTES.SIGN_IN)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={cn(
          'flex items-center gap-3 rounded-xl p-1 transition-colors duration-200 ease-out',
          'hover:bg-gray-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          open && 'bg-gray-100/80',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="profile-dropdown"
        aria-label={`${profile.name} account menu`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {!compact && (
          <div className="hidden min-w-0 text-right sm:block">
            <p className="truncate text-sm font-semibold text-gray-900">{profile.name}</p>
            <p className="truncate text-xs text-gray-500">
              {profile.roleLabel ?? profile.role}
            </p>
          </div>
        )}
        <Avatar
          initials={profile.initials}
          size="md"
          aria-hidden="true"
          className="shadow-sm"
        />
      </button>

      <ProfileDropdown
        open={open}
        onClose={close}
        user={profile}
        onLogout={handleLogout}
      />
    </div>
  )
}
