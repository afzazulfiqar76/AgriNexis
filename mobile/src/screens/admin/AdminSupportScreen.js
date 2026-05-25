import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.SUPPORT]

export function AdminSupportScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Contact requests, help desk tickets, and support workflows."
    />
  )
}
