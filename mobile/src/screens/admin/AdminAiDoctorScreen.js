import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { INITIAL_ADMIN_DIAGNOSES } from '../../data/admin/adminAiDoctor'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.AI_DOCTOR]

export function AdminAiDoctorScreen() {
  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      {INITIAL_ADMIN_DIAGNOSES.map((d) => (
        <AppCard key={d.id} style={styles.card} padding={spacing.md}>
          <View style={styles.row}>
            <Text style={styles.crop}>{d.crop}</Text>
            <StatusBadge
              status={d.result === 'Healthy' ? 'active' : 'warning'}
              label={d.result}
            />
          </View>
          <Text style={styles.meta}>{d.user}</Text>
          <Text style={styles.meta}>
            Confidence {d.confidence}% · {d.date}
          </Text>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, alignItems: 'center' },
  crop: { flex: 1, fontSize: 16, fontFamily: fontFamily.bold, color: colors.text },
  meta: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500 },
})
