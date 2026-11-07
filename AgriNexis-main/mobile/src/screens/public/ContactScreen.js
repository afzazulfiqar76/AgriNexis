import { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Clock, Mail, MapPin } from 'lucide-react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ScreenContainer } from '../../components/ScreenContainer'
import {
  CONTACT_PAGE,
  INQUIRY_TYPES,
  SUPPORT_INFO_CARDS,
} from '../../data/contact'
import {
  CONTACT_FORM_FIELDS,
  EMAIL_PATTERN,
  INITIAL_CONTACT_FORM,
  REQUIRED_FIELDS,
} from '../../data/contactForm'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { showError, showSuccess } from '../../lib/toast'

const ICONS = { mail: Mail, mapPin: MapPin, clock: Clock }

export function ContactScreen() {
  const [form, setForm] = useState(INITIAL_CONTACT_FORM)
  const [submitted, setSubmitted] = useState(false)

  const inquiryLabel = useMemo(() => {
    const match = INQUIRY_TYPES.find((t) => t.value === form.inquiryType)
    return match?.label ?? 'Select inquiry type'
  }, [form.inquiryType])

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const cycleInquiry = () => {
    const options = INQUIRY_TYPES.filter((t) => t.value)
    const idx = options.findIndex((t) => t.value === form.inquiryType)
    const next = options[(idx + 1) % options.length]
    setField(CONTACT_FORM_FIELDS.INQUIRY_TYPE, next.value)
  }

  const handleSubmit = () => {
    for (const key of REQUIRED_FIELDS) {
      if (!String(form[key] ?? '').trim()) {
        showError('Please fill in all required fields.')
        return
      }
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      showError('Please enter a valid email address.')
      return
    }
    setSubmitted(true)
    showSuccess('Message sent. We will reply as soon as possible.')
    setForm(INITIAL_CONTACT_FORM)
  }

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <Text style={styles.label}>{CONTACT_PAGE.label}</Text>
      <Text style={styles.title}>{CONTACT_PAGE.title}</Text>
      <Text style={styles.sub}>{CONTACT_PAGE.subtitle}</Text>

      <AppCard style={styles.form} padding={spacing.md}>
        <Text style={styles.formTitle}>{CONTACT_PAGE.formTitle}</Text>
        <Text style={styles.helper}>{CONTACT_PAGE.formHelper}</Text>
        {submitted ? (
          <Text style={styles.successNote}>
            Thanks! Your message was recorded locally (contact API not connected yet — same as web).
          </Text>
        ) : null}
        <InputField
          label="Full name *"
          value={form.fullName}
          onChangeText={(v) => setField(CONTACT_FORM_FIELDS.FULL_NAME, v)}
          placeholder="Your name"
          autoCapitalize="words"
        />
        <InputField
          label="Email *"
          value={form.email}
          onChangeText={(v) => setField(CONTACT_FORM_FIELDS.EMAIL, v)}
          placeholder="you@example.com"
          keyboardType="email-address"
        />
        <Text style={styles.fieldLabel}>Inquiry type *</Text>
        <Pressable style={styles.select} onPress={cycleInquiry} accessibilityRole="button">
          <Text style={styles.selectText}>{inquiryLabel}</Text>
        </Pressable>
        <InputField
          label="Message *"
          value={form.message}
          onChangeText={(v) => setField(CONTACT_FORM_FIELDS.MESSAGE, v)}
          placeholder="How can we help?"
        />
        <AppButton title="Send Message" onPress={handleSubmit} large />
      </AppCard>

      <AppCard padding={spacing.md}>
        <Text style={styles.infoTitle}>{CONTACT_PAGE.infoPanelTitle}</Text>
        <Text style={styles.helper}>{CONTACT_PAGE.infoPanelSubtitle}</Text>
        {SUPPORT_INFO_CARDS.map((card) => {
          const Icon = ICONS[card.icon] ?? Mail
          return (
            <View key={card.id} style={styles.infoRow}>
              <Icon size={18} color={colors.primary} strokeWidth={2} />
              <View style={styles.infoBody}>
                <Text style={styles.infoLabel}>{card.label}</Text>
                <Text style={styles.infoText}>{card.value}</Text>
              </View>
            </View>
          )
        })}
      </AppCard>
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
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  sub: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  form: { marginBottom: spacing.md },
  formTitle: { fontSize: 18, fontFamily: fontFamily.bold, marginBottom: spacing.xs },
  helper: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  successNote: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray700,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  select: {
    backgroundColor: colors.base300,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    marginBottom: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  selectText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.text },
  infoTitle: { fontSize: 16, fontFamily: fontFamily.bold, marginBottom: spacing.xs },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  infoBody: { flex: 1, minWidth: 0 },
  infoLabel: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500 },
  infoText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray700 },
})
