import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.IOT]

export function AdminIotMonitoringScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Live sensor telemetry, device online status, and irrigation alerts."
    />
  )
}
