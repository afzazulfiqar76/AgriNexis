import { StyleSheet, Text, View } from 'react-native'
import { BarChart3 } from 'lucide-react-native'
import { AppCard } from '../AppCard'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function ChartPlaceholder({ title, height = 160 }) {
  return (
    <AppCard style={{ minHeight: height }} padding={spacing.lg}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.center}>
        <BarChart3 size={40} color={colors.gray200} strokeWidth={1.5} />
        <Text style={styles.hint}>Chart visualization</Text>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: 14, fontFamily: fontFamily.semibold, color: colors.text, marginBottom: spacing.md },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, minHeight: 100 },
  hint: { fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray400 },
})
