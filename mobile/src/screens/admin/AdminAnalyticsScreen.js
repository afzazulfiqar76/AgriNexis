import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.ANALYTICS]

export function AdminAnalyticsScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Usage trends, engagement metrics, and platform performance."
    />
  )
}
