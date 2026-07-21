import { useMemo, useState } from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { UserListCard } from '../../components/admin/UserListCard'
import { InputField } from '../../components/InputField'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { ADMIN_USERS } from '../../data/adminUsers'
import { showInfo } from '../../lib/toast'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.USERS]

export function AdminUsersScreen() {
  const [query, setQuery] = useState('')
  const users = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ADMIN_USERS
    return ADMIN_USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        String(u.role).toLowerCase().includes(q) ||
        String(u.status).toLowerCase().includes(q),
    )
  }, [query])

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <InputField
        label="Search users"
        value={query}
        onChangeText={setQuery}
        placeholder="Name, email, role…"
      />
      <View>
        {users.map((user) => (
          <UserListCard
            key={user.id}
            name={user.name}
            email={user.email}
            role={user.userType || user.role}
            status={user.status}
            showActions
            onPress={() => showInfo('User actions are local-only on web until admin APIs exist.')}
          />
        ))}
      </View>
    </ScreenContainer>
  )
}
