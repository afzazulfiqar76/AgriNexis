import { View } from 'react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { UserListCard } from '../../components/admin/UserListCard'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { ADMIN_USERS } from '../../data/adminUsers'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.USERS]

export function AdminUsersScreen() {
  return (
    <ScreenContainer>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <View>
        {ADMIN_USERS.map((user) => (
          <UserListCard
            key={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            status={user.status}
            showActions
          />
        ))}
      </View>
    </ScreenContainer>
  )
}
