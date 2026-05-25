import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function Header({ title, subtitle, right }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.text}>
        <Text style={typography.h2}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  text: { flex: 1 },
  sub: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
  },
})
