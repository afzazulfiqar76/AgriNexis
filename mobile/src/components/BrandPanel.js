import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { AgriNexisLogo } from './AgriNexisLogo'
import { FeatureCard } from './FeatureCard'
import { FEATURES } from '../constants/features'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function BrandPanel({ headline = 'Welcome Back!', compact }) {
  const { width } = useWindowDimensions()
  const isCompact = compact ?? width < 768

  return (
    <View style={[styles.wrap, isCompact && styles.wrapCompact]}>
      <View style={styles.brandRow}>
        <AgriNexisLogo size={isCompact ? 40 : 48} />
        <View style={styles.brandText}>
          <Text style={styles.brandName}>AgriNexis</Text>
          <Text style={styles.tagline}>Urban Farming Platform</Text>
        </View>
      </View>
      <Text style={[styles.headline, isCompact && styles.headlineCompact]}>{headline}</Text>
      {!isCompact ? (
        <Text style={styles.desc}>
          Join the future of sustainable urban agriculture. Monitor your farms, get AI-powered
          insights, and connect with a community of passionate farmers.
        </Text>
      ) : (
        <Text style={styles.descCompact}>
          Smart tools for urban farms — AI plant care, IoT sensors, and community support.
        </Text>
      )}
      {!isCompact ? (
        <View style={styles.grid}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.label} {...f} />
          ))}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.lg, marginBottom: spacing.lg },
  wrapCompact: { gap: spacing.sm, marginBottom: spacing.md },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  brandText: { flex: 1, minWidth: 0 },
  brandName: { fontSize: 18, fontFamily: fontFamily.bold, color: colors.emerald800 },
  tagline: { fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray500 },
  headline: { ...typography.brandHeadline, fontSize: 28 },
  headlineCompact: { fontSize: 22, letterSpacing: -0.3 },
  desc: { fontSize: 16, fontFamily: fontFamily.regular, color: colors.gray600, lineHeight: 24 },
  descCompact: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    lineHeight: 20,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
})
