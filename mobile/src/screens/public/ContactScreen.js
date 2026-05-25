import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Mail, MapPin, Clock } from 'lucide-react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ScreenContainer } from '../../components/ScreenContainer'
import { CONTACT_PAGE } from '../../data/contactContent'
import { FOOTER_CONTACT } from '../../constants/footer'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { showSuccess } from '../../lib/toast'

export function ContactScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <ScreenContainer>
      <Text style={styles.label}>{CONTACT_PAGE.label}</Text>
      <Text style={styles.title}>{CONTACT_PAGE.title}</Text>
      <Text style={styles.sub}>{CONTACT_PAGE.subtitle}</Text>
      <AppCard style={styles.form}>
        <Text style={styles.formTitle}>Send a Message</Text>
        <InputField label="Name *" value={name} onChangeText={setName} placeholder="Your name" />
        <InputField label="Email *" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <InputField label="Message *" value={message} onChangeText={setMessage} placeholder="How can we help?" />
        <AppButton title="Send Message" onPress={() => showSuccess('Message sent (demo)')} large />
      </AppCard>
      <AppCard>
        <Text style={styles.infoTitle}>Support Center</Text>
        <InfoRow icon={Mail} text={FOOTER_CONTACT.email} />
        <InfoRow icon={MapPin} text={FOOTER_CONTACT.location} />
        <InfoRow icon={Clock} text="Mon–Fri · 9:00 AM – 6:00 PM PKT" />
      </AppCard>
    </ScreenContainer>
  )
}

function InfoRow({ icon: Icon, text }) {
  return (
    <View style={styles.infoRow}>
      <Icon size={18} color={colors.primary} strokeWidth={2} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.primary, textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center' },
  title: { fontSize: 28, fontFamily: fontFamily.bold, textAlign: 'center', marginTop: spacing.sm },
  sub: { fontSize: 15, fontFamily: fontFamily.regular, color: colors.gray600, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.lg, lineHeight: 22 },
  form: { marginBottom: spacing.md },
  formTitle: { fontSize: 18, fontFamily: fontFamily.bold, marginBottom: spacing.md },
  infoTitle: { fontSize: 16, fontFamily: fontFamily.bold, marginBottom: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  infoText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray700 },
})
