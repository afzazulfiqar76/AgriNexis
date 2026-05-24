import { ADMIN_ROUTES } from '@/constants/adminRoutes'
import { ROUTES } from '@/constants/routes'

export const PROFILE_MENU_ITEM_IDS = {
  PROFILE: 'profile',
  SETTINGS: 'settings',
  ADMIN: 'admin',
  WEBSITE: 'website',
  LOGOUT: 'logout',
}

/** Base items shown in every profile dropdown. */
export const PROFILE_MENU_BASE_ITEMS = [
  {
    id: PROFILE_MENU_ITEM_IDS.PROFILE,
    label: 'My Profile',
    icon: 'user',
  },
  {
    id: PROFILE_MENU_ITEM_IDS.SETTINGS,
    label: 'Settings',
    icon: 'settings',
  },
]

export function isAdminPanelPath(pathname) {
  return (
    pathname === ADMIN_ROUTES.ROOT || pathname.startsWith(`${ADMIN_ROUTES.ROOT}/`)
  )
}

/** Admin-only portal link: admin panel on main site, website when already in admin. */
export function getPortalMenuItem(inAdminPanel) {
  if (inAdminPanel) {
    return {
      id: PROFILE_MENU_ITEM_IDS.WEBSITE,
      label: 'Go To Website',
      icon: 'globe',
      to: ROUTES.HOME,
      adminOnly: true,
    }
  }

  return {
    id: PROFILE_MENU_ITEM_IDS.ADMIN,
    label: 'Go To Admin Panel',
    icon: 'layoutDashboard',
    to: ADMIN_ROUTES.ROOT,
    adminOnly: true,
  }
}

export function getProfilePath({ isAdmin }) {
  return isAdmin ? ADMIN_ROUTES.PROFILE : ROUTES.DASHBOARD
}

export function buildProfileMenuItems({ pathname, isAdmin }) {
  const items = [...PROFILE_MENU_BASE_ITEMS]

  if (isAdmin) {
    items.push(getPortalMenuItem(isAdminPanelPath(pathname)))
  }

  return items
}
