import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from './AppCard'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function ProfileCard({ user }) {
  if (!user) return null
  return (
    <AppCard style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{user.initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={typography.h3}>{user.name}</Text>
        <Text style={typography.caption}>{user.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{user.roleLabel}</Text>
        </View>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { color: '#fff', fontFamily: fontFamily.bold, fontSize: 18 },
  info: { flex: 1 },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: colors.base200,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 108, 0.2)',
  },
  badgeText: { fontSize: 11, fontFamily: fontFamily.semibold, color: colors.primary },
})
