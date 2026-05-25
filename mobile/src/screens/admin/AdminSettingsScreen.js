import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.SETTINGS]

export function AdminSettingsScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Platform configuration, security policies, and integration keys."
    />
  )
}
