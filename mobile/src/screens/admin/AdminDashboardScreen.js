import { StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminStatCard } from '../../components/admin/AdminStatCard'
import { ActivityFeed } from '../../components/admin/ActivityFeed'
import { DataTable } from '../../components/admin/DataTable'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { ChartPlaceholder } from '../../components/admin/ChartPlaceholder'
import { AppCard } from '../../components/AppCard'
import {
  ADMIN_ACTIVITY_FEED,
  ADMIN_DASHBOARD_STATS,
  ADMIN_RECENT_USERS,
  ADMIN_SYSTEM_STATUS,
} from '../../data/adminDashboard'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.DASHBOARD]

export function AdminDashboardScreen() {
  const columns = [
    { key: 'name', header: 'Name', flex: 1, render: (r) => <Text style={styles.cell}>{r.name}</Text> },
    { key: 'email', header: 'Email', flex: 1.2, render: (r) => <Text style={styles.cell}>{r.email}</Text> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <ScreenContainer>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <View style={styles.stats}>
        {ADMIN_DASHBOARD_STATS.map((s) => (
          <AdminStatCard key={s.id} {...s} />
        ))}
      </View>
      <AppCard style={styles.statusCard}>
        <Text style={styles.statusTitle}>System Status</Text>
        <View style={styles.statusRow}>
          {ADMIN_SYSTEM_STATUS.map((item) => (
            <View key={item.id} style={styles.statusChip}>
              <View style={styles.dot} />
              <Text style={styles.statusLabel}>{item.label}</Text>
              <StatusBadge status={item.status} />
            </View>
          ))}
        </View>
      </AppCard>
      <ChartPlaceholder title="Usage overview" />
      <DataTable title="Recent users" columns={columns} data={ADMIN_RECENT_USERS} />
      <ActivityFeed items={ADMIN_ACTIVITY_FEED} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  statusCard: { marginBottom: spacing.lg },
  statusTitle: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.gray500, textTransform: 'uppercase', marginBottom: spacing.md },
  statusRow: { gap: spacing.sm },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.gray50,
    marginBottom: spacing.sm,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  statusLabel: { flex: 1, fontSize: 14, fontFamily: fontFamily.medium, color: colors.gray700 },
  cell: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.text },
})
