import { Pressable, StyleSheet, Text, View } from 'react-native'
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  Droplets,
  Leaf,
  Shield,
  Sprout,
  Thermometer,
  Wind,
} from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { DashboardStatCard } from '../../components/DashboardStatCard'
import { FarmCard } from '../../components/FarmCard'
import { WelcomeBanner } from '../../components/WelcomeBanner'
import { ScreenContainer } from '../../components/ScreenContainer'
import { DASHBOARD_STATS } from '../../data/dashboardStats'
import { URBAN_FARMS } from '../../data/urbanFarms'
import { SMART_ALERTS } from '../../data/smartAlerts'
import { WEATHER_FORECAST } from '../../data/weatherForecast'
import { colors, fontFamily, typography } from '../../constants/theme'
import { ROUTES } from '../../constants/routes'
import { spacing, touchTarget } from '../../constants/spacing'
import { showInfo } from '../../lib/toast'

const STAT_ICONS = {
  sprout: Sprout,
  leaf: Leaf,
  shield: Shield,
  droplets: Droplets,
}

const WEATHER_ICONS = {
  thermometer: Thermometer,
  droplets: Droplets,
  wind: Wind,
}

const ALERT_ICONS = {
  'alert-triangle': AlertTriangle,
  'check-circle': CheckCircle2,
  'cloud-rain': CloudRain,
}

const ALERT_COLORS = {
  warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706' },
  success: { bg: '#ecfdf5', border: '#a7f3d0', icon: '#059669' },
  info: { bg: '#f0f9ff', border: '#bae6fd', icon: '#0284c7' },
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

      <WelcomeBanner
        userName={firstName}
        onAddFarm={() => showInfo('Add Farm coming soon')}
        onViewAnalytics={() => parent?.navigate(ROUTES.DASHBOARD)}
      />

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
          <AppButton
            title="Add Farm"
            variant="primary"
            style={styles.addBtn}
            onPress={() => showInfo('Add Farm coming soon')}
          />
        </View>
        {URBAN_FARMS.map((farm) => (
          <FarmCard key={farm.id} {...farm} />
        ))}
      </AppCard>

      <AppCard padding={spacing.md} style={styles.section}>
        <Text style={styles.sectionTitle}>Weather Forecast</Text>
        <Text style={styles.weatherMeta}>
          {WEATHER_FORECAST.dateLabel} · {WEATHER_FORECAST.condition}
        </Text>
        <Text style={styles.weatherTemp}>{WEATHER_FORECAST.temperature}</Text>
        <View style={styles.weatherGrid}>
          {WEATHER_FORECAST.stats.map((stat) => {
            const Icon = WEATHER_ICONS[stat.icon] ?? Thermometer
            return (
              <View key={stat.id} style={styles.weatherChip}>
                <View style={[styles.weatherIcon, { backgroundColor: stat.iconBg }]}>
                  <Icon size={16} color={stat.iconColor} strokeWidth={2} />
                </View>
                <View style={styles.weatherChipBody}>
                  <Text style={styles.weatherLabel}>{stat.label}</Text>
                  <Text style={styles.weatherValue}>{stat.value}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </AppCard>

      <Text style={[typography.label, styles.insightsLabel]}>Smart alerts</Text>
      {SMART_ALERTS.map((alert) => {
        const Icon = ALERT_ICONS[alert.icon] ?? AlertTriangle
        const tone = ALERT_COLORS[alert.variant] ?? ALERT_COLORS.info
        return (
          <AppCard
            key={alert.id}
            style={[styles.alertCard, { borderColor: tone.border, backgroundColor: tone.bg }]}
            padding={spacing.md}
          >
            <View style={styles.alertRow}>
              <Icon size={18} color={tone.icon} strokeWidth={2} />
              <View style={styles.alertBody}>
                <Text style={styles.alertTitle}>{alert.message}</Text>
                <Text style={typography.caption}>{alert.timeAgo}</Text>
              </View>
            </View>
          </AppCard>
        )
      })}

      <AppCard style={styles.cta} padding={spacing.md}>
        <Text style={typography.h3}>AI Plant Doctor</Text>
        <Text style={[typography.caption, styles.ctaSub]}>
          Upload a photo for instant disease detection
        </Text>
        <AppButton
          title="Open AI Doctor"
          variant="outline-emerald"
          onPress={() => navigation.navigate(ROUTES.AI_DOCTOR)}
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
  weatherMeta: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
  },
  weatherTemp: {
    marginTop: spacing.sm,
    fontSize: 28,
    fontFamily: fontFamily.bold,
    color: colors.text,
  },
  weatherGrid: { marginTop: spacing.md, gap: spacing.sm },
  weatherChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  weatherIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherChipBody: { flex: 1 },
  weatherLabel: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500 },
  weatherValue: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text },
  insightsLabel: { marginBottom: spacing.sm, color: colors.gray500 },
  alertCard: { marginBottom: spacing.sm, borderWidth: 1 },
  alertRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  alertBody: { flex: 1, minWidth: 0 },
  alertTitle: {
    fontSize: 14,
    fontFamily: fontFamily.semibold,
    color: colors.text,
    marginBottom: 2,
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
