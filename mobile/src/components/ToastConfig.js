import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../constants/theme'
import { radius, spacing } from '../constants/spacing'

const base = {
  minHeight: 48,
  borderRadius: radius.lg,
  borderLeftWidth: 4,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  width: '92%',
  maxWidth: 400,
}

export const toastConfig = {
  success: ({ text1 }) => (
    <View style={[styles.wrap, styles.success]}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }) => (
    <View style={[styles.wrap, styles.error]}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  info: ({ text1 }) => (
    <View style={[styles.wrap, styles.info]}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
}

const styles = StyleSheet.create({
  wrap: {
    ...base,
    backgroundColor: colors.base100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  success: { borderLeftColor: colors.primary },
  error: { borderLeftColor: colors.danger },
  info: { borderLeftColor: colors.sky600 },
  text: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.text,
  },
})
