import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ProfileCard } from '../../components/ProfileCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { showInfo, showSuccess } from '../../lib/toast'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.PROFILE]

export function AdminProfileScreen() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <ProfileCard user={user} />
      <AppCard style={styles.card} padding={spacing.md}>
        <Text style={styles.section}>Profile details</Text>
        <InputField label="Full name" value={name} onChangeText={setName} autoCapitalize="words" />
        <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppButton
          title="Save profile"
          onPress={() => showSuccess('Profile updated locally (no profile API yet — same as web).')}
        />
      </AppCard>
      <AppCard padding={spacing.md}>
        <Text style={styles.section}>Security</Text>
        <AppButton
          title="Change password"
          variant="outline"
          onPress={() => showInfo('Password change is a mock delay on web — API not connected.')}
        />
      </AppCard>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginVertical: spacing.md },
  section: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
})
