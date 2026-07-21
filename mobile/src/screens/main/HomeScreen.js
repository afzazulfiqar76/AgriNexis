import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Bell, ChevronRight, Droplets, Leaf, Shield, Sprout } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { DashboardStatCard } from '../../components/DashboardStatCard'
import { FarmCard } from '../../components/FarmCard'
import { WelcomeBanner } from '../../components/WelcomeBanner'
import { ScreenContainer } from '../../components/ScreenContainer'
import { DASHBOARD_STATS } from '../../data/dashboardStats'
import { URBAN_FARMS } from '../../data/urbanFarms'
import { HOME_ALERTS } from '../../data/homeInsights'
import { colors, fontFamily, typography } from '../../constants/theme'
import { ROUTES } from '../../constants/routes'
import { spacing, touchTarget } from '../../constants/spacing'

const STAT_ICONS = {
  sprout: Sprout,
  leaf: Leaf,
  shield: Shield,
  droplets: Droplets,
}

export function HomeScreen({ navigation }) {
  const { user } = useAuth()
  const parent = navigation.getParent()
  const firstName = user?.name?.split(' ')[0] ?? 'Farmer'

  return (
    <ScreenContainer>
      <View style={styles.topRow}>
        <Text style={styles.heading} numberOfLines={1}>
          Dashboard
        </Text>
        <Pressable
          onPress={() => parent?.navigate(ROUTES.NOTIFICATIONS)}
          style={styles.bell}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={8}
        >
          <Bell size={22} color={colors.text} strokeWidth={2} />
        </Pressable>
      </View>

      <WelcomeBanner userName={firstName} />

      <View style={styles.statsGrid}>
        {DASHBOARD_STATS.map((stat) => {
          const Icon = STAT_ICONS[stat.icon]
          return (
            <DashboardStatCard
              key={stat.id}
              {...stat}
              icon={Icon ? <Icon size={20} color="#fff" strokeWidth={2} /> : null}
            />
          )
        })}
      </View>

      <AppCard padding={spacing.md} style={styles.section}>
        <View style={styles.sectionHead}>
          <View style={styles.sectionTitles}>
            <Text style={styles.sectionTitle}>My Urban Farms</Text>
            <Text style={styles.sectionSub}>Manage and monitor your farming plots</Text>
          </View>
          <AppButton title="Add Farm" variant="primary" style={styles.addBtn} />
        </View>
        {URBAN_FARMS.map((farm) => (
          <FarmCard key={farm.id} {...farm} />
        ))}
      </AppCard>

      <Text style={[typography.label, styles.insightsLabel]}>Insights & alerts</Text>
      {HOME_ALERTS.map((alert) => (
        <AppCard key={alert.id} style={styles.alertCard} padding={spacing.md}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={typography.caption}>{alert.detail}</Text>
        </AppCard>
      ))}

      <AppCard style={styles.cta} padding={spacing.md}>
        <Text style={typography.h3}>AI Plant Doctor</Text>
        <Text style={[typography.caption, styles.ctaSub]}>
          Upload a photo for instant disease detection
        </Text>
        <AppButton
          title="Open AI Doctor"
          variant="outline-emerald"
          onPress={() => navigation.navigate('AiDoctor')}
          style={styles.ctaBtn}
        />
      </AppCard>

      <Pressable
        style={styles.dashLink}
        onPress={() => parent?.navigate(ROUTES.DASHBOARD)}
        accessibilityRole="link"
      >
        <Text style={styles.dashLinkText}>Full dashboard</Text>
        <ChevronRight size={20} color={colors.primary} />
      </Pressable>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  heading: { ...typography.h2, flex: 1, fontSize: 22 },
  bell: {
    minWidth: touchTarget,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  section: { marginBottom: spacing.md },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitles: { flex: 1, minWidth: 0 },
  sectionTitle: { fontSize: 18, fontFamily: fontFamily.bold, color: colors.text },
  sectionSub: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    marginTop: 2,
  },
  addBtn: { paddingHorizontal: spacing.md, flexShrink: 0 },
  insightsLabel: { marginBottom: spacing.sm, color: colors.gray500 },
  alertCard: { marginBottom: spacing.sm },
  alertTitle: {
    fontSize: 15,
    fontFamily: fontFamily.semibold,
    color: colors.text,
    marginBottom: 4,
  },
  cta: { marginTop: spacing.sm },
  ctaSub: { marginVertical: spacing.sm },
  ctaBtn: { alignSelf: 'flex-start' },
  dashLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: 4,
    minHeight: touchTarget,
  },
  dashLinkText: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.primary },
})
