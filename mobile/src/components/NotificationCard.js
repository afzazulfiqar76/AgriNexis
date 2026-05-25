import { StyleSheet, Text, View } from 'react-native'
import { AlertCircle, CheckCircle, Info } from 'lucide-react-native'
import { AppCard } from './AppCard'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

const VARIANT_ICON = {
  warning: { Icon: AlertCircle, color: colors.warning, bg: '#fef3c7' },
  success: { Icon: CheckCircle, color: colors.success, bg: '#d1fae5' },
  info: { Icon: Info, color: colors.sky600, bg: '#e0f2fe' },
}

export function NotificationCard({ title, description, timeAgo, variant = 'info', read }) {
  const meta = VARIANT_ICON[variant] ?? VARIANT_ICON.info
  const { Icon } = meta
  return (
    <AppCard style={[styles.card, !read && styles.unread]}>
      <View style={[styles.icon, { backgroundColor: meta.bg }]}>
        <Icon size={22} color={meta.color} strokeWidth={2} />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, !read && styles.titleBold]}>{title}</Text>
        <Text style={typography.caption} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.time}>{timeAgo}</Text>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  unread: { borderColor: 'rgba(0, 163, 108, 0.27)', backgroundColor: colors.base200 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  title: { fontSize: 15, fontFamily: fontFamily.regular, color: colors.text },
  titleBold: { fontFamily: fontFamily.bold },
  time: { fontSize: 11, fontFamily: fontFamily.regular, color: colors.textMuted, marginTop: 4 },
})
