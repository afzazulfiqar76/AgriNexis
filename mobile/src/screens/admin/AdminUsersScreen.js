import { StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { DataTable } from '../../components/admin/DataTable'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { ADMIN_USERS } from '../../data/adminUsers'
import { colors, fontFamily } from '../../constants/theme'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.USERS]

export function AdminUsersScreen() {
  const columns = [
    { key: 'name', header: 'Name', flex: 1, render: (r) => <Text style={styles.cell}>{r.name}</Text> },
    { key: 'email', header: 'Email', flex: 1.2, render: (r) => <Text style={styles.cell}>{r.email}</Text> },
    { key: 'role', header: 'Role', render: (r) => <Text style={styles.cell}>{r.role}</Text> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <ScreenContainer>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <DataTable columns={columns} data={ADMIN_USERS} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  cell: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.text },
})
