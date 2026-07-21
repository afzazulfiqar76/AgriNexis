import { StyleSheet, Text, View } from 'react-native'
import {
  BarChart3,
  BrainCircuit,
  Gauge,
  Sprout,
  Users,
  UsersRound,
} from 'lucide-react-native'
import { AppCard } from '../AppCard'
import { colors, fontFamily, typography } from '../../constants/theme'
import { radius, spacing } from '../../constants/spacing'
import { useLayout } from '../../utils/layout'

const ICONS = {
  users: Users,
  sprout: Sprout,
  brain: BrainCircuit,
  gauge: Gauge,
  usersRound: UsersRound,
  chart: BarChart3,
}

const ICON_BG = {
  users: colors.primary,
  sprout: colors.emerald600,
  brain: colors.violet600,
  gauge: colors.sky600,
  usersRound: colors.amber600,
  chart: colors.orange500,
}

export function AdminStatCard({ label, value, trend, icon = 'users' }) {
  const Icon = ICONS[icon] ?? Users
  const bg = ICON_BG[icon] ?? colors.primary
  const { halfCard, isSmallPhone } = useLayout()

  return (
    <AppCard
      style={[styles.card, halfCard, isSmallPhone && styles.fullWidth]}
      padding={spacing.md}
    >
      <View style={styles.top}>
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
        <View style={[styles.iconWrap, { backgroundColor: bg }]}>
          <Icon size={20} color="#fff" strokeWidth={2} />
        </View>
      </View>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
        {value}
      </Text>
      <View style={styles.trendWrap}>
        {trend ? (
          <Text style={styles.trend} numberOfLines={1}>
            {trend}
          </Text>
        ) : null}
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 124,
    justifyContent: 'space-between',
  },
  fullWidth: {
    flexBasis: '100%',
    maxWidth: '100%',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    minHeight: 40,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
    paddingTop: 2,
  },
  value: { ...typography.statValue, fontSize: 26, marginTop: spacing.sm },
  trendWrap: { minHeight: 18, marginTop: 4 },
  trend: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.primary },
})
