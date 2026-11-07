import { StyleSheet, Text, View } from 'react-native'
import { MapPin, Sprout } from 'lucide-react-native'
import { AppCard } from './AppCard'
import { ProgressBar } from './ProgressBar'
import { colors, fontFamily } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function FarmCard({ name, type, location, plantCount, healthScore, accentColor }) {
  return (
    <AppCard style={[styles.card, { borderTopWidth: 3, borderTopColor: accentColor }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>{type}</Text>
      <View style={styles.meta}>
        <MapPin size={14} color={colors.gray500} />
        <Text style={styles.metaText}>{location}</Text>
      </View>
      <View style={styles.meta}>
        <Sprout size={14} color={colors.gray500} />
        <Text style={styles.metaText}>{plantCount} plants</Text>
      </View>
      <Text style={styles.healthLabel}>Health score</Text>
      <ProgressBar value={healthScore} fillColor={accentColor} />
      <Text style={styles.healthValue}>{healthScore}%</Text>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: '100%', marginBottom: spacing.sm },
  name: { fontSize: 16, fontFamily: fontFamily.bold, color: colors.text },
  type: { fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500, marginTop: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  metaText: { fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray600 },
  healthLabel: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500, marginTop: spacing.md, marginBottom: 4 },
  healthValue: { fontSize: 13, fontFamily: fontFamily.semibold, color: colors.text, marginTop: 4, textAlign: 'right' },
})
