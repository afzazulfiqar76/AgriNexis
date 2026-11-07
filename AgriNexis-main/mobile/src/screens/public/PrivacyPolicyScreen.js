import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { PRIVACY_PAGE, PRIVACY_SECTIONS } from '../../data/privacyPolicyContent'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function PrivacyPolicyScreen() {
  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <Text style={styles.label}>{PRIVACY_PAGE.label}</Text>
      <Text style={styles.title}>{PRIVACY_PAGE.title}</Text>
      <Text style={styles.sub}>{PRIVACY_PAGE.subtitle}</Text>
      <Text style={styles.updated}>Last updated: {PRIVACY_PAGE.lastUpdated}</Text>
      {PRIVACY_SECTIONS.map((section) => (
        <AppCard key={section.id} style={styles.card} padding={spacing.md}>
          <Text style={styles.cardTitle}>{section.title}</Text>
          {(section.paragraphs ?? []).map((p) => (
            <Text key={p.slice(0, 32)} style={styles.paragraph}>
              {p}
            </Text>
          ))}
          {(section.bullets ?? []).map((b) => (
            <Text key={b} style={styles.bullet}>
              • {b}
            </Text>
          ))}
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: { fontSize: 26, fontFamily: fontFamily.bold, marginTop: spacing.sm },
  sub: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    marginTop: 4,
    lineHeight: 22,
  },
  updated: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
    marginVertical: spacing.md,
  },
  card: { marginBottom: spacing.sm },
  cardTitle: { fontSize: 17, fontFamily: fontFamily.bold, marginBottom: spacing.sm },
  paragraph: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray700,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray700,
    lineHeight: 22,
    marginBottom: 4,
  },
})
