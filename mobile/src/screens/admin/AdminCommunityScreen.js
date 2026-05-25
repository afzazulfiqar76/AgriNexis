import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.COMMUNITY]

export function AdminCommunityScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Moderate posts, manage challenges, and review flagged content."
    />
  )
}
