import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from './AppCard'
import { ProgressBar } from './ProgressBar'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

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
  return (
    <AppCard style={[styles.card, cardBg && { backgroundColor: cardBg }]} padding={spacing.md}>
      <View style={[styles.iconChip, { backgroundColor: iconBg }]}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueColor && { color: valueColor }]}>{value}</Text>
      {progress != null ? (
        <View style={styles.progressWrap}>
          <ProgressBar value={progress} fillColor={progressFill} trackColor={progressTrack} />
        </View>
      ) : null}
      {footer ? (
        <Text style={styles.footer}>
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
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: '46%', position: 'relative' },
  iconChip: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500, paddingRight: 48 },
  value: { ...typography.statValue, marginTop: spacing.sm },
  progressWrap: { marginTop: spacing.sm },
  footer: { marginTop: spacing.sm, fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600 },
  footerHighlight: { fontFamily: fontFamily.semibold, color: colors.blue600 },
})
