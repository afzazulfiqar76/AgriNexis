import { Sprout } from 'lucide-react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { EmptyState } from '../../components/EmptyState'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.FARMS]

export function AdminFarmsScreen() {
  return (
    <ScreenContainer>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <EmptyState
        icon={Sprout}
        title="No farm analytics yet"
        description="Monitor urban farms, health scores, and plot assignments here once farm data is connected to the admin API."
      />
    </ScreenContainer>
  )
}
