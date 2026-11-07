import { StyleSheet, Text, View } from 'react-native'
import { Inbox } from 'lucide-react-native'
import { AppButton } from './AppButton'
import { AppCard } from './AppCard'
import { colors, fontFamily } from '../constants/theme'
import { radius, spacing, touchTarget } from '../constants/spacing'

/**
 * Professional empty / placeholder state for dashboards and stub screens.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
  compact = false,
}) {
  return (
    <AppCard style={[styles.card, compact && styles.compact]} padding={spacing.lg}>
      <View
        style={[styles.iconWrap, compact && styles.iconWrapCompact]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Icon size={compact ? 28 : 36} color={colors.primary} strokeWidth={1.75} />
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <AppButton
          title={actionLabel}
          variant="outline-emerald"
          onPress={onAction}
          style={styles.action}
          accessibilityLabel={actionLabel}
        />
      ) : null}
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  compact: {
    paddingVertical: spacing.md,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.emerald100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconWrapCompact: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  action: {
    marginTop: spacing.sm,
    alignSelf: 'center',
    minHeight: touchTarget,
  },
})
