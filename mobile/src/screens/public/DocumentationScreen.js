import { StyleSheet, Text } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const SECTIONS = [
  { title: 'Getting Started', body: 'Create an account, add your first urban farm, and explore the dashboard overview.' },
  { title: 'AI Plant Doctor', body: 'Upload clear leaf photos for disease detection and treatment recommendations.' },
  { title: 'IoT Sensors', body: 'Pair ESP32 devices, assign plots, and monitor soil moisture, temperature, and light.' },
  { title: 'Community', body: 'Join challenges, share tips, and climb the seasonal leaderboard.' },
]

export function DocumentationScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.label}>Docs</Text>
      <Text style={styles.title}>Documentation</Text>
      <Text style={styles.sub}>Guides for every AgriNexis module</Text>
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
  label: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.primary, textTransform: 'uppercase', letterSpacing: 2 },
  title: { fontSize: 28, fontFamily: fontFamily.bold, marginTop: spacing.sm },
  sub: { fontSize: 15, fontFamily: fontFamily.regular, color: colors.gray600, marginBottom: spacing.lg, marginTop: 4 },
  card: { marginBottom: spacing.sm },
  cardTitle: { fontSize: 16, fontFamily: fontFamily.bold, marginBottom: spacing.sm },
  cardBody: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600, lineHeight: 22 },
})
