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
import { spacing } from '../../constants/spacing'

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
        <Text style={typography.h2}>Dashboard</Text>
        <Pressable onPress={() => parent?.navigate(ROUTES.NOTIFICATIONS)} style={styles.bell}>
          <Bell size={24} color={colors.text} strokeWidth={2} />
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
          <View>
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
        <AppCard key={alert.id} style={styles.alertCard}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={typography.caption}>{alert.detail}</Text>
        </AppCard>
      ))}

      <AppCard style={styles.cta}>
        <Text style={typography.h3}>AI Plant Doctor</Text>
        <Text style={[typography.caption, styles.ctaSub]}>Upload a photo for instant disease detection</Text>
        <AppButton
          title="Open AI Doctor"
          variant="outline-emerald"
          onPress={() => navigation.navigate('AiDoctor')}
          style={styles.ctaBtn}
        />
      </AppCard>

      <Pressable style={styles.dashLink} onPress={() => parent?.navigate(ROUTES.DASHBOARD)}>
        <Text style={styles.dashLinkText}>Full dashboard</Text>
        <ChevronRight size={20} color={colors.primary} />
      </Pressable>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  bell: { padding: 8 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md, gap: spacing.sm },
  sectionTitle: { fontSize: 20, fontFamily: fontFamily.bold, color: colors.text },
  sectionSub: { fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500, marginTop: 2 },
  addBtn: { paddingHorizontal: spacing.md },
  insightsLabel: { marginBottom: spacing.sm, color: colors.gray500 },
  alertCard: { marginBottom: spacing.sm },
  alertTitle: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text, marginBottom: 4 },
  cta: { marginTop: spacing.md },
  ctaSub: { marginVertical: spacing.sm },
  ctaBtn: { alignSelf: 'flex-start' },
  dashLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg, gap: 4 },
  dashLinkText: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.primary },
})
