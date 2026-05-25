import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function Checkbox({ checked, onToggle, label, children }) {
  return (
    <Pressable style={styles.row} onPress={onToggle} accessibilityRole="checkbox">
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.check}>✓</Text> : null}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  box: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  check: { color: '#fff', fontSize: 12, fontWeight: '700' },
  label: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600, flex: 1 },
})
