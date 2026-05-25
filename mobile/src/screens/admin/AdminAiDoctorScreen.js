import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { AdminPlaceholderScreen } from './AdminPlaceholderScreen'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.AI_DOCTOR]

export function AdminAiDoctorScreen() {
  return (
    <AdminPlaceholderScreen
      {...meta}
      description="Review plant diagnosis records, model confidence scores, and user uploads."
    />
  )
}
