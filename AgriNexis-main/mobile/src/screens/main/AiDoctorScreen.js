import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera, Leaf } from 'lucide-react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ScreenContainer } from '../../components/ScreenContainer'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { AI_DIAGNOSIS_STEPS } from '../../data/aiDiagnosisSteps'
import { RECENT_DIAGNOSES } from '../../data/recentDiagnoses'
import { colors, fontFamily, typography } from '../../constants/theme'
import { radius, spacing } from '../../constants/spacing'
import { showError, showInfo } from '../../lib/toast'

const STATUS_MAP = {
  good: 'active',
  moderate: 'warning',
  low: 'pending',
}

export function AiDoctorScreen() {
  const [previewUri, setPreviewUri] = useState(null)

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      showError('Photo library permission is required to upload a plant image.')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
      allowsEditing: true,
    })
    if (result.canceled || !result.assets?.[0]?.uri) return
    setPreviewUri(result.assets[0].uri)
    showInfo('Image selected. Diagnosis API is not connected yet (same as web).')
  }

  return (
    <ScreenContainer>
      <Header title="AI Plant Doctor" subtitle="Diagnose crop diseases in seconds" />
      <AppCard style={styles.upload} padding={spacing.md}>
        <View style={styles.uploadInner}>
          {previewUri ? (
            <Image source={{ uri: previewUri }} style={styles.preview} accessibilityLabel="Selected plant photo" />
          ) : (
            <Camera size={40} color={colors.violet600} strokeWidth={1.5} />
          )}
          <Text style={[typography.h3, styles.uploadTitle]}>Upload plant photo</Text>
          <Text style={typography.caption}>PNG or JPG — clear leaf photos work best</Text>
          <AppButton title="Choose Photo" variant="gradient" onPress={pickImage} style={styles.btn} />
        </View>
      </AppCard>

      <Text style={styles.sectionTitle}>How it works</Text>
      {AI_DIAGNOSIS_STEPS.map((step) => (
        <AppCard key={step.id} style={styles.step} padding={spacing.md}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{step.step}</Text>
          </View>
          <View style={styles.stepBody}>
            <Text style={typography.h3}>{step.title}</Text>
            <Text style={typography.caption}>{step.description}</Text>
          </View>
        </AppCard>
      ))}

      <Text style={styles.sectionTitle}>Recent diagnoses</Text>
      {RECENT_DIAGNOSES.map((item) => (
        <AppCard key={item.id} style={styles.diagnosis} padding={spacing.md}>
          <View style={[styles.diagIcon, { backgroundColor: item.iconBg }]}>
            <Leaf size={18} color={item.iconColor} strokeWidth={2} />
          </View>
          <View style={styles.diagBody}>
            <Text style={styles.diagName} numberOfLines={1}>
              {item.plantName}
            </Text>
            <Text style={typography.caption} numberOfLines={1}>
              {item.condition} · {item.date}
            </Text>
          </View>
          <StatusBadge status={STATUS_MAP[item.status] ?? 'read'} label={item.status} />
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  upload: {
    marginBottom: spacing.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.violet200,
    backgroundColor: colors.violet50,
  },
  uploadInner: { alignItems: 'center', paddingVertical: spacing.lg },
  preview: {
    width: '100%',
    height: 160,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.gray100,
  },
  uploadTitle: { marginTop: spacing.sm, marginBottom: 4 },
  btn: { marginTop: spacing.md },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  step: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm, alignItems: 'flex-start' },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.violet600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontFamily: fontFamily.bold, fontSize: 14 },
  stepBody: { flex: 1, minWidth: 0, gap: 2 },
  diagnosis: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  diagIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagBody: { flex: 1, minWidth: 0 },
  diagName: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text },
})
