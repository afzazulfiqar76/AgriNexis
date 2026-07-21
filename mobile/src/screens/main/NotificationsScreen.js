import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '../../components/ScreenContainer'
import { Header } from '../../components/Header'
import { NotificationCard } from '../../components/NotificationCard'
import { NOTIFICATIONS } from '../../data/notifications'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function NotificationsScreen() {
  const items = NOTIFICATIONS ?? []

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <Header title="Notifications" subtitle="Alerts from farms, AI Doctor, and community" />
      {items.length === 0 ? (
        <Text style={styles.empty}>No notifications yet.</Text>
      ) : (
        items.map((n) => <NotificationCard key={n.id} {...n} />)
      )}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  empty: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
})
