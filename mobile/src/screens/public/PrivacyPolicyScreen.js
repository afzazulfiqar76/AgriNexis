import { StyleSheet, Text } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const SECTIONS = [
  { title: 'Information We Collect', body: 'Account details, farm data, IoT telemetry, and optional plant images for AI diagnosis.' },
  { title: 'How We Use Data', body: 'To operate the platform, improve models, send alerts, and provide community features.' },
  { title: 'Data Security', body: 'We use industry-standard encryption and access controls. You may request export or deletion of your data.' },
  { title: 'Contact', body: 'Privacy questions: info@agrinexis.com' },
]

export function PrivacyPolicyScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.updated}>Last updated: January 2026</Text>
      {SECTIONS.map((s) => (
        <AppCard key={s.title} style={styles.card}>
          <Text style={styles.cardTitle}>{s.title}</Text>
          <Text style={styles.cardBody}>{s.body}</Text>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontFamily: fontFamily.bold },
  updated: { fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500, marginBottom: spacing.lg, marginTop: 4 },
  card: { marginBottom: spacing.sm },
  cardTitle: { fontSize: 16, fontFamily: fontFamily.bold, marginBottom: spacing.sm },
  cardBody: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600, lineHeight: 22 },
})
