import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function AdminPageHeader({ title, subtitle }) {
  return (
    <View style={styles.wrap}>
      <Text style={typography.h2}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md, gap: 4 },
  sub: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500, lineHeight: 20 },
})
