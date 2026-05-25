import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../../constants/theme'

const VARIANTS = {
  active: { bg: colors.emerald100, text: '#065f46', border: '#a7f3d0' },
  operational: { bg: colors.emerald100, text: '#065f46', border: '#a7f3d0' },
  approved: { bg: colors.emerald100, text: '#065f46', border: '#a7f3d0' },
  pending: { bg: colors.amber100, text: colors.amber800, border: '#fde68a' },
  warning: { bg: colors.amber100, text: colors.amber800, border: '#fde68a' },
  open: { bg: '#ffedd5', text: colors.orange600, border: '#fed7aa' },
  suspended: { bg: colors.red100, text: colors.red600, border: '#fecaca' },
  offline: { bg: colors.red100, text: colors.red600, border: '#fecaca' },
  read: { bg: colors.gray100, text: colors.slate700, border: colors.gray200 },
}

export function StatusBadge({ status, label }) {
  const key = String(status ?? '').toLowerCase().replace(/\s+/g, '_')
  const v = VARIANTS[key] ?? VARIANTS.read
  const display = label ?? status
  return (
    <View style={[styles.badge, { backgroundColor: v.bg, borderColor: v.border }]}>
      <Text style={[styles.text, { color: v.text }]}>{display}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontFamily: fontFamily.semibold,
    textTransform: 'capitalize',
  },
})
