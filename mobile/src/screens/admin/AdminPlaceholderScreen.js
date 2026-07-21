import { LayoutDashboard } from 'lucide-react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { EmptyState } from '../../components/EmptyState'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'

export function AdminPlaceholderScreen({ title, subtitle, description }) {
  return (
    <ScreenContainer>
      <AdminPageHeader title={title} subtitle={subtitle} />
      <EmptyState
        icon={LayoutDashboard}
        title={title}
        description={
          description ||
          'This admin section is ready for data. Connect the matching API to populate live metrics and lists.'
        }
      />
    </ScreenContainer>
  )
}
