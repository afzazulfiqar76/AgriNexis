import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { INITIAL_ADMIN_SUPPORT_REQUESTS } from '../../data/admin/adminSupport'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { ROUTES } from '../../constants/routes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.SUPPORT]

const STATUS_MAP = {
  open: 'open',
  in_progress: 'pending',
  resolved: 'active',
}

export function AdminSupportScreen({ navigation }) {
  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <AppButton
        title="Open Contact page"
        variant="outline-emerald"
        style={styles.contactBtn}
        onPress={() => navigation.getParent()?.navigate(ROUTES.CONTACT)}
      />
      {INITIAL_ADMIN_SUPPORT_REQUESTS.map((s) => (
        <AppCard key={s.id} style={styles.card} padding={spacing.md}>
          <View style={styles.row}>
            <Text style={styles.name}>{s.name}</Text>
            <StatusBadge status={STATUS_MAP[s.status] ?? 'read'} label={s.status.replace('_', ' ')} />
          </View>
          <Text style={styles.meta}>{s.email}</Text>
          <Text style={styles.type}>{s.inquiryType}</Text>
          <Text style={styles.message}>{s.message}</Text>
          <Text style={styles.meta}>{s.date}</Text>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  contactBtn: { marginBottom: spacing.md, alignSelf: 'flex-start' },
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, alignItems: 'center' },
  name: { flex: 1, fontSize: 15, fontFamily: fontFamily.bold, color: colors.text },
  meta: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500 },
  type: { marginTop: spacing.sm, fontSize: 13, fontFamily: fontFamily.semibold, color: colors.primary },
  message: { marginTop: 4, fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray700, lineHeight: 20 },
})
