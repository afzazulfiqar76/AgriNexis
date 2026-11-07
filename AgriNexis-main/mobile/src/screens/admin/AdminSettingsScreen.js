import { StyleSheet, Text } from 'react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import { showInfo } from '../../lib/toast'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.SETTINGS]

const SECTIONS = [
  {
    id: 'general',
    title: 'General',
    fields: [
      { id: 'platformName', label: 'Platform Name', defaultValue: 'AgriNexis' },
      { id: 'supportEmail', label: 'Support Email', defaultValue: 'info@agrinexis.com' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    fields: [
      { id: 'defaultRegion', label: 'Default Region', defaultValue: 'Lahore, Pakistan' },
      { id: 'maintenance', label: 'Maintenance Mode', defaultValue: 'Disabled' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    fields: [
      { id: 'emailAlerts', label: 'Email Alerts', defaultValue: 'Enabled' },
      { id: 'pushAlerts', label: 'Push Notifications', defaultValue: 'Enabled' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    fields: [
      { id: 'sessionTimeout', label: 'Session Timeout (min)', defaultValue: '60' },
      { id: 'twoFactor', label: 'Require 2FA for Admins', defaultValue: 'Recommended' },
    ],
  },
]

export function AdminSettingsScreen() {
  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      {SECTIONS.map((section) => (
        <AppCard key={section.id} style={styles.card} padding={spacing.md}>
          <Text style={styles.section}>{section.title}</Text>
          {section.fields.map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              value={field.defaultValue}
              onChangeText={() => {}}
              editable={false}
            />
          ))}
        </AppCard>
      ))}
      <AppButton
        title="Save changes"
        disabled
        onPress={() => showInfo('API integration coming soon')}
        style={styles.save}
      />
      <Text style={styles.hint}>Save is disabled until settings API is available (same as web).</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  section: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  save: { opacity: 0.6 },
  hint: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    textAlign: 'center',
  },
})
