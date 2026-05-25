import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppCard } from './AppCard'
import { colors, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

const ICON_MAP = {
  users: 'people',
  sprout: 'leaf',
  brain: 'hardware-chip',
  gauge: 'speedometer',
  usersRound: 'people-circle',
  chart: 'bar-chart',
  droplets: 'water',
  thermometer: 'thermometer',
  cloud: 'cloud',
  sun: 'sunny',
}

export function StatCard({ label, value, trend, icon = 'chart', accent = colors.primary }) {
  const iconName = ICON_MAP[icon] ?? 'stats-chart'
  return (
    <AppCard style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: accent }]}>
        <Ionicons name={iconName} size={20} color="#fff" />
      </View>
      <Text style={typography.caption}>{label}</Text>
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
  value: { fontSize: 22, fontWeight: '700', color: colors.text, marginTop: 4 },
  trend: { fontSize: 12, color: colors.primary, marginTop: 4, fontWeight: '500' },
})
