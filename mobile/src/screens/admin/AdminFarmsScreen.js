import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.FARMS]

export function AdminFarmsScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Monitor urban farms, health scores, and plot assignments across the platform."
    />
  )
}
