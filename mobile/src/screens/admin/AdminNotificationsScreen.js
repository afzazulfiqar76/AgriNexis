import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.NOTIFICATIONS]

export function AdminNotificationsScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Platform alerts, delivery logs, and broadcast messages."
    />
  )
}
