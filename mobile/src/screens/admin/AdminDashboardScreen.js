import { StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminStatCard } from '../../components/admin/AdminStatCard'
import { ActivityFeed } from '../../components/admin/ActivityFeed'
import { UserListCard } from '../../components/admin/UserListCard'
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
import { radius, spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.DASHBOARD]

export function AdminDashboardScreen() {
  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <View style={styles.stats}>
        {ADMIN_DASHBOARD_STATS.map((s) => (
          <AdminStatCard key={s.id} {...s} />
        ))}
      </View>

      <AppCard style={styles.statusCard} padding={spacing.md}>
        <Text style={styles.statusTitle}>System Status</Text>
        <View style={styles.statusRow}>
          {ADMIN_SYSTEM_STATUS.map((item) => (
            <View key={item.id} style={styles.statusChip}>
              <View style={styles.dot} />
              <Text style={styles.statusLabel} numberOfLines={1}>
                {item.label}
              </Text>
              <StatusBadge status={item.status} />
            </View>
          ))}
        </View>
      </AppCard>

      <View style={styles.block}>
        <ChartPlaceholder
          title="Usage overview"
          description="Platform usage charts will show here when analytics data is connected."
        />
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Recent users</Text>
        {ADMIN_RECENT_USERS.map((user) => (
          <UserListCard
            key={user.id}
            name={user.name}
            email={user.email}
            status={user.status}
          />
        ))}
      </View>

      <ActivityFeed items={ADMIN_ACTIVITY_FEED} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statusCard: { marginBottom: spacing.md },
  statusTitle: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  statusRow: { gap: spacing.sm },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.gray50,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success, flexShrink: 0 },
  statusLabel: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray700,
  },
  block: { marginBottom: spacing.md },
  sectionTitle: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
})
