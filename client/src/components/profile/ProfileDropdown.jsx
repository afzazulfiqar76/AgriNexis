import { useLocation } from 'react-router-dom'
import { DropdownItem } from '@/components/profile/DropdownItem'
import { ADMIN_ROUTES } from '@/constants/adminRoutes'
import { USER_ROLES } from '@/constants/auth'
import {
  PROFILE_MENU_ITEM_IDS,
  buildProfileMenuItems,
  getProfilePath,
} from '@/constants/profileMenu'
import { PROFILE_DROPDOWN_PANEL } from '@/constants/uiClasses'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

export function ProfileDropdown({ open, onClose, user, onLogout }) {
  const { pathname } = useLocation()

  if (!open || !user) return null

  const isAdmin = user.role === USER_ROLES.ADMIN
  const visibleItems = buildProfileMenuItems({ pathname, isAdmin })

  function getItemPath(item) {
    if (item.to) return item.to
    if (item.id === PROFILE_MENU_ITEM_IDS.PROFILE) {
      return getProfilePath({ isAdmin })
    }
    if (item.id === PROFILE_MENU_ITEM_IDS.SETTINGS) {
      return isAdmin ? ADMIN_ROUTES.SETTINGS : ROUTES.DASHBOARD
    }
    return ROUTES.HOME
  }

  return (
    <div
      id="profile-dropdown"
      role="menu"
      aria-label="Profile menu"
      className={cn(
        'absolute right-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),16rem)] motion-safe:animate-dropdown-in',
        PROFILE_DROPDOWN_PANEL,
      )}
    >
      <header className="border-b border-slate-700/50 px-4 py-3">
        <p className="truncate text-sm font-semibold text-white">{user.name}</p>
        <p className="truncate text-xs text-slate-400">
          {user.email ?? user.roleLabel ?? user.role}
        </p>
      </header>

      <div className="space-y-1 p-2">
        {visibleItems.map((item) => (
          <DropdownItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            to={getItemPath(item)}
            onClick={onClose}
          />
        ))}

        <hr className="my-2 border-slate-700/50" aria-hidden="true" />

        <DropdownItem
          icon="logOut"
          label="Logout"
          variant="danger"
          onClick={() => {
            onClose()
            onLogout()
          }}
        />
      </div>
    </div>
  )
}
