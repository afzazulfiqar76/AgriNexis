import { StyleSheet, Text, View } from 'react-native'
import { Camera } from 'lucide-react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AI_DIAGNOSIS_STEPS } from '../../data/aiDoctor'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { showInfo } from '../../lib/toast'

export function AiDoctorScreen() {
  return (
    <ScreenContainer>
      <Header title="AI Plant Doctor" subtitle="Diagnose crop diseases in seconds" />
      <AppCard style={styles.upload}>
        <View style={styles.uploadInner}>
          <Camera size={40} color={colors.violet600} strokeWidth={1.5} />
          <Text style={[typography.h3, styles.uploadTitle]}>Upload plant photo</Text>
          <Text style={typography.caption}>Drag & drop or tap to select an image</Text>
          <AppButton title="Choose Photo" variant="gradient" onPress={() => showInfo('Image picker coming soon')} style={styles.btn} />
        </View>
      </AppCard>
      <Text style={styles.sectionTitle}>How it works</Text>
      {AI_DIAGNOSIS_STEPS.map((step) => (
        <AppCard key={step.id} style={styles.step}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{step.step}</Text>
          </View>
          <View style={styles.stepBody}>
            <Text style={typography.h3}>{step.title}</Text>
            <Text style={typography.caption}>{step.description}</Text>
          </View>
        </AppCard>
      ))}
      <AppCard style={styles.recent}>
        <Text style={styles.recentTitle}>Recent diagnoses</Text>
        <Text style={typography.caption}>Tomato — Leaf Blight · 92% confidence</Text>
        <Text style={[typography.caption, { marginTop: 8 }]}>Basil — Nutrient deficiency · 88%</Text>
      </AppCard>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  upload: {
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.violet200,
    backgroundColor: colors.violet50,
  },
  uploadInner: { alignItems: 'center', paddingVertical: spacing.xl },
  uploadTitle: { marginTop: spacing.sm, marginBottom: 4 },
  btn: { marginTop: spacing.md },
  sectionTitle: { fontSize: 16, fontFamily: fontFamily.bold, color: colors.text, marginBottom: spacing.sm },
  step: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.violet600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontFamily: fontFamily.bold, fontSize: 14 },
  stepBody: { flex: 1 },
  recent: { marginTop: spacing.md },
  recentTitle: { fontSize: 16, fontFamily: fontFamily.bold, marginBottom: spacing.sm },
})
