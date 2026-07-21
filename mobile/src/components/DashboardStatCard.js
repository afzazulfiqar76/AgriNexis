import { StyleSheet, Text, View } from 'react-native'
import { ProgressBar } from './ProgressBar'
import { colors, fontFamily, shadows, typography } from '../constants/theme'
import { radius, spacing } from '../constants/spacing'
import { useLayout } from '../utils/layout'

export function DashboardStatCard({
  label,
  value,
  footer,
  footerHighlight,
  icon,
  iconBg = colors.primary,
  cardBg,
  valueColor,
  progress,
  progressFill,
  progressTrack,
}) {
  const { halfCard, isSmallPhone } = useLayout()

  return (
    <View
      style={[
        styles.card,
        halfCard,
        isSmallPhone && styles.fullWidth,
        cardBg ? { backgroundColor: cardBg } : null,
      ]}
    >
      <View style={styles.top}>
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
        <View style={[styles.iconChip, { backgroundColor: iconBg }]}>{icon}</View>
      </View>
      <Text
        style={[styles.value, valueColor && { color: valueColor }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {value}
      </Text>
      <View style={styles.footerArea}>
        {progress != null ? (
          <View style={styles.progressWrap}>
            <ProgressBar value={progress} fillColor={progressFill} trackColor={progressTrack} />
          </View>
        ) : null}
        {footer ? (
          <Text style={styles.footer} numberOfLines={2}>
            {footerHighlight ? (
              <>
                {footer.replace(footerHighlight, '')}
                <Text style={styles.footerHighlight}>{footerHighlight}</Text>
              </>
            ) : (
              footer
            )}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.base100,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.card,
  },
  fullWidth: {
    flexBasis: '100%',
    maxWidth: '100%',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    minHeight: 40,
  },
  iconChip: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
    paddingTop: 2,
  },
  value: {
    ...typography.statValue,
    fontSize: 28,
    marginTop: spacing.sm,
  },
  footerArea: {
    marginTop: spacing.sm,
    minHeight: 36,
    justifyContent: 'flex-end',
  },
  progressWrap: { marginBottom: spacing.xs },
  footer: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
  },
  footerHighlight: { fontFamily: fontFamily.semibold, color: colors.blue600 },
})
