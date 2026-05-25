import { StyleSheet, Text } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { ProfileCard } from '../../components/ProfileCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { showInfo } from '../../lib/toast'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.PROFILE]

export function AdminProfileScreen() {
  const { user } = useAuth()

  return (
    <ScreenContainer>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <ProfileCard user={user} />
      <AppCard style={styles.card}>
        <Text style={styles.label}>Account email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </AppCard>
      <AppButton title="Edit profile" variant="outline" onPress={() => showInfo('Edit profile modal coming soon')} />
      <AppButton title="Change password" variant="ghost" onPress={() => showInfo('Change password modal coming soon')} style={styles.btn} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginVertical: spacing.md },
  label: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.gray500, textTransform: 'uppercase' },
  value: { fontSize: 15, fontFamily: fontFamily.regular, marginTop: 4 },
  btn: { marginTop: spacing.sm },
})
