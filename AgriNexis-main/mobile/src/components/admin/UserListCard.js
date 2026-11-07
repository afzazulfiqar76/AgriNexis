import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MoreHorizontal } from 'lucide-react-native'
import { AppCard } from '../AppCard'
import { StatusBadge } from './StatusBadge'
import { colors, fontFamily } from '../../constants/theme'
import { radius, spacing, touchTarget } from '../../constants/spacing'
import { initialsFromName } from '../../utils/layout'
import { showInfo } from '../../lib/toast'

/**
 * Mobile-friendly user row (replaces desktop DataTable on phones).
 */
export function UserListCard({
  name,
  email,
  role,
  status,
  showActions = false,
  onPress,
}) {
  const initials = initialsFromName(name)

  return (
    <AppCard style={styles.card} padding={spacing.md}>
      <View style={styles.row}>
        <View style={styles.avatar} accessibilityLabel={`${name} avatar`}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <StatusBadge status={status} />
          </View>
          {email ? (
            <Text style={styles.email} numberOfLines={1} ellipsizeMode="middle">
              {email}
            </Text>
          ) : null}
          <View style={styles.metaRow}>
            {role ? (
              <View style={styles.roleChip}>
                <Text style={styles.roleText}>{role}</Text>
              </View>
            ) : null}
            {showActions ? (
              <Pressable
                onPress={onPress ?? (() => showInfo('User actions coming soon'))}
                style={styles.actionBtn}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Actions for ${name}`}
              >
                <MoreHorizontal size={20} color={colors.gray600} strokeWidth={2} />
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.emerald100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.emerald700,
  },
  body: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    minWidth: 0,
    fontSize: 15,
    fontFamily: fontFamily.semibold,
    color: colors.text,
  },
  email: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    gap: spacing.sm,
  },
  roleChip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  roleText: {
    fontSize: 11,
    fontFamily: fontFamily.semibold,
    color: colors.gray700,
    letterSpacing: 0.3,
  },
  actionBtn: {
    minWidth: touchTarget,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -spacing.sm,
  },
})
