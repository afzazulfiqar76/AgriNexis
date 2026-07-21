import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronRight, Shield } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { ProfileCard } from '../../components/ProfileCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { USER_ROLES } from '../../constants/auth'
import { ROUTES } from '../../constants/routes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing, touchTarget } from '../../constants/spacing'

const RESOURCE_LINKS = [
  { label: 'Documentation', route: ROUTES.DOCUMENTATION },
  { label: 'FAQs', route: ROUTES.FAQS },
  { label: 'Contact Us', route: ROUTES.CONTACT },
  { label: 'Privacy Policy', route: ROUTES.PRIVACY_POLICY },
]

export function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth()
  const parent = navigation.getParent()
  const isAdmin = user?.role === USER_ROLES.ADMIN

  return (
    <ScreenContainer>
      <ProfileCard user={user} />
      <AppCard style={styles.info}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{user?.email}</Text>
        {user?.phoneNumber ? (
          <>
            <Text style={[styles.infoLabel, styles.infoGap]}>Phone</Text>
            <Text style={styles.infoValue}>{user.phoneNumber}</Text>
          </>
        ) : null}
      </AppCard>
      <Text style={styles.section}>Resources</Text>
      {RESOURCE_LINKS.map((link) => (
        <Pressable
          key={link.route}
          onPress={() => parent?.navigate(link.route)}
          accessibilityRole="button"
          accessibilityLabel={link.label}
        >
          <AppCard style={styles.linkRow}>
            <Text style={styles.linkText}>{link.label}</Text>
            <ChevronRight size={20} color={colors.gray400} />
          </AppCard>
        </Pressable>
      ))}
      {isAdmin ? (
        <AppButton
          title="Admin Panel"
          variant="outline-emerald"
          icon={<Shield size={18} color={colors.emerald700} />}
          onPress={() => parent?.navigate('Admin')}
          style={styles.adminBtn}
        />
      ) : null}
      <AppButton title="Sign Out" variant="outline" onPress={logout} style={styles.signOut} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  info: { marginTop: spacing.md, marginBottom: spacing.lg },
  infoLabel: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.gray500, textTransform: 'uppercase' },
  infoValue: { fontSize: 15, fontFamily: fontFamily.regular, color: colors.text, marginTop: 4 },
  infoGap: { marginTop: spacing.md },
  section: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.gray500, textTransform: 'uppercase', marginBottom: spacing.sm },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    minHeight: touchTarget,
  },
  linkText: { fontSize: 15, fontFamily: fontFamily.medium, color: colors.text },
  adminBtn: { marginTop: spacing.lg },
  signOut: { marginTop: spacing.md },
})
