import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { INITIAL_ADMIN_NOTIFICATIONS } from '../../data/admin/adminNotifications'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.NOTIFICATIONS]

export function AdminNotificationsScreen() {
  const [items, setItems] = useState(INITIAL_ADMIN_NOTIFICATIONS)

  const markRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, status: 'read' } : n)))
  }

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      {items.map((n) => (
        <AppCard key={n.id} style={styles.card} padding={spacing.md}>
          <View style={styles.row}>
            <Text style={styles.title} numberOfLines={2}>
              {n.title}
            </Text>
            <StatusBadge status={n.status === 'delivered' ? 'active' : n.status === 'read' ? 'read' : 'pending'} label={n.status} />
          </View>
          <Text style={styles.meta}>
            To {n.recipient} · {n.type}
          </Text>
          <Text style={styles.meta}>{n.date}</Text>
          {n.status !== 'read' ? (
            <AppButton title="Mark read" variant="ghost" style={styles.btn} onPress={() => markRead(n.id)} />
          ) : null}
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, alignItems: 'flex-start' },
  title: { flex: 1, fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text },
  meta: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500 },
  btn: { alignSelf: 'flex-start', marginTop: spacing.sm },
})
