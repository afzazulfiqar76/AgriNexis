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
import { spacing } from '../../constants/spacing'

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
  return (
    <AppCard style={styles.card} padding={spacing.md}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Icon size={20} color="#fff" strokeWidth={2} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {trend ? <Text style={styles.trend}>{trend}</Text> : null}
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: '46%' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500 },
  value: { ...typography.statValue, fontSize: 26, marginTop: 4 },
  trend: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.medium, color: colors.primary },
})
