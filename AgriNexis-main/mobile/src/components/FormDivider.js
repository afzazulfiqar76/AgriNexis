import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function FormDivider({ label = 'OR CONTINUE WITH' }) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
    gap: spacing.md,
  },
  line: { flex: 1, height: 1, backgroundColor: colors.gray200 },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray400,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
})
