import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../AppCard'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function ActivityFeed({ title = 'Recent Activity', items = [] }) {
  return (
    <AppCard padding={spacing.md}>
      <Text style={[typography.label, styles.title]}>{title}</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.dot} />
          <View style={styles.body}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      ))}
    </AppCard>
  )
}

const styles = StyleSheet.create({
  title: { marginBottom: spacing.md, color: colors.gray500 },
  row: { flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.gray100 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 6 },
  body: { flex: 1, minWidth: 0 },
  message: { fontSize: 14, fontFamily: fontFamily.medium, color: colors.text, lineHeight: 20 },
  time: { fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray500, marginTop: 2 },
})
