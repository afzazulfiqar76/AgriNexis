import { StyleSheet, Text, View } from 'react-native'
import { AgriNexisLogo } from './AgriNexisLogo'
import { FeatureCard } from './FeatureCard'
import { FEATURES } from '../constants/features'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function BrandPanel({ headline = 'Welcome Back!' }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.brandRow}>
        <AgriNexisLogo />
        <View>
          <Text style={styles.brandName}>AgriNexis</Text>
          <Text style={styles.tagline}>Urban Farming Platform</Text>
        </View>
      </View>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.desc}>
        Join the future of sustainable urban agriculture. Monitor your farms, get AI-powered
        insights, and connect with a community of passionate farmers.
      </Text>
      <View style={styles.grid}>
        {FEATURES.map((f) => (
          <FeatureCard key={f.label} {...f} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.lg, marginBottom: spacing.lg },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  brandName: { fontSize: 18, fontFamily: fontFamily.bold, color: colors.emerald800 },
  tagline: { fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray500 },
  headline: { ...typography.brandHeadline, fontSize: 28 },
  desc: { fontSize: 16, fontFamily: fontFamily.regular, color: colors.gray600, lineHeight: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
})
