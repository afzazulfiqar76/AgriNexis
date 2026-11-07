import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { EmptyState } from '../../components/EmptyState'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { ADMIN_ANALYTICS_METRICS, ADMIN_TOP_FARMS } from '../../data/admin/adminAnalytics'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { useLayout } from '../../utils/layout'
import { BarChart3 } from 'lucide-react-native'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.ANALYTICS]

export function AdminAnalyticsScreen() {
  const { halfCard, isSmallPhone } = useLayout()

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <View style={styles.stats}>
        {ADMIN_ANALYTICS_METRICS.map((m) => (
          <AppCard
            key={m.id}
            style={[styles.stat, halfCard, isSmallPhone && styles.full]}
            padding={spacing.md}
          >
            <Text style={styles.label}>{m.label}</Text>
            <Text style={styles.value}>{m.value}</Text>
            <Text style={styles.change}>{m.change}</Text>
          </AppCard>
        ))}
      </View>
      <EmptyState
        icon={BarChart3}
        title="Charts coming soon"
        description="Usage charts will appear here when analytics reporting is connected."
        compact
      />
      <Text style={styles.section}>Top farms</Text>
      {ADMIN_TOP_FARMS.map((f) => (
        <AppCard key={f.rank} style={styles.farmCard} padding={spacing.md}>
          <View style={styles.farm}>
            <Text style={styles.rank}>#{f.rank}</Text>
            <View style={styles.farmBody}>
              <Text style={styles.farmName}>{f.name}</Text>
              <Text style={styles.farmMeta}>
                {f.owner} · Score {f.score}
              </Text>
            </View>
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  stat: { minHeight: 100 },
  full: { flexBasis: '100%' },
  label: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500 },
  value: { fontSize: 22, fontFamily: fontFamily.bold, color: colors.text, marginTop: 4 },
  change: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.semibold, color: colors.primary },
  section: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
    textTransform: 'uppercase',
  },
  farmCard: { marginBottom: spacing.sm },
  farm: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  rank: { fontSize: 16, fontFamily: fontFamily.bold, color: colors.gray400, width: 36 },
  farmBody: { flex: 1 },
  farmName: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text },
  farmMeta: { fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500, marginTop: 2 },
})
