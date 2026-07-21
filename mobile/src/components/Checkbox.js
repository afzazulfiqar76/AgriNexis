import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../constants/theme'
import { spacing, touchTarget } from '../constants/spacing'

export function Checkbox({ checked, onToggle, label, children }) {
  return (
    <Pressable
      style={styles.row}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!checked }}
      hitSlop={4}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.check}>✓</Text> : null}
      </View>
      {label ? (
        <Text style={styles.label} numberOfLines={3}>
          {label}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    minHeight: touchTarget,
    paddingVertical: spacing.xs,
  },
  box: {
    width: 22,
    height: 22,
    marginTop: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  check: { color: '#fff', fontSize: 12, fontWeight: '700' },
  label: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
  },
})
