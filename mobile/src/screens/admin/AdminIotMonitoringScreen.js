import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { INITIAL_ADMIN_IOT_DEVICES, IOT_SUMMARY_STATS } from '../../data/admin/adminIot'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { useLayout } from '../../utils/layout'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.IOT]

const VARIANT_STATUS = {
  success: 'operational',
  danger: 'offline',
  warning: 'warning',
}

export function AdminIotMonitoringScreen() {
  const { halfCard, isSmallPhone } = useLayout()

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <View style={styles.stats}>
        {IOT_SUMMARY_STATS.map((s) => (
          <AppCard
            key={s.label}
            style={[styles.statCard, halfCard, isSmallPhone && styles.full]}
            padding={spacing.md}
          >
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statValue}>{s.value}</Text>
            <StatusBadge status={VARIANT_STATUS[s.variant] ?? 'read'} />
          </AppCard>
        ))}
      </View>
      {INITIAL_ADMIN_IOT_DEVICES.map((d) => (
        <AppCard key={d.id} style={styles.card} padding={spacing.md}>
          <View style={styles.row}>
            <Text style={styles.id}>{d.id}</Text>
            <StatusBadge status={d.status === 'online' ? 'operational' : d.status} />
          </View>
          <Text style={styles.meta}>{d.farm}</Text>
          <Text style={styles.meta}>
            {d.owner} · Last reading {d.lastReading}
          </Text>
          <Text style={styles.sensors}>{d.sensors}</Text>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  statCard: { minHeight: 100, justifyContent: 'space-between' },
  full: { flexBasis: '100%' },
  statLabel: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500 },
  statValue: { fontSize: 22, fontFamily: fontFamily.bold, color: colors.text, marginVertical: 4 },
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  id: { flex: 1, fontSize: 15, fontFamily: fontFamily.bold, color: colors.text },
  meta: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500 },
  sensors: { marginTop: spacing.sm, fontSize: 13, fontFamily: fontFamily.medium, color: colors.gray700 },
})
