import { StyleSheet, Text, View } from 'react-native'
import { BrainCircuit, Gauge, UsersRound } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { AppCard } from '../../components/AppCard'
import { AppButton } from '../../components/AppButton'
import { ScreenContainer } from '../../components/ScreenContainer'
import { colors, fontFamily, typography } from '../../constants/theme'
import { ROUTES } from '../../constants/routes'
import { spacing } from '../../constants/spacing'

const QUICK_LINKS = [
  {
    id: 'ai',
    title: 'AI Doctor',
    description: 'Diagnose plant health with AI guidance',
    route: ROUTES.AI_DOCTOR,
    icon: BrainCircuit,
    iconBg: '#ede9fe',
    iconColor: '#6d28d9',
  },
  {
    id: 'iot',
    title: 'IoT Sensors',
    description: 'Monitor soil moisture and environmental data',
    route: ROUTES.IOT_SENSORS,
    icon: Gauge,
    iconBg: '#d1fae5',
    iconColor: '#047857',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Connect with urban farmers and share insights',
    route: ROUTES.COMMUNITY,
    icon: UsersRound,
    iconBg: '#e0f2fe',
    iconColor: '#0369a1',
  },
]

export function DashboardScreen({ navigation }) {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'Farmer'

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <Text style={styles.eyebrow}>Farmer Dashboard</Text>
      <Text style={typography.h2}>Welcome back, {firstName}</Text>
      <Text style={styles.sub}>
        {user?.roleLabel ?? user?.role ?? 'Urban Farmer'} — manage your urban farm from one place.
      </Text>

      {QUICK_LINKS.map((link) => {
        const Icon = link.icon
        return (
          <AppCard key={link.id} style={styles.module} padding={spacing.md}>
            <View style={[styles.iconWrap, { backgroundColor: link.iconBg }]}>
              <Icon size={22} color={link.iconColor} strokeWidth={2} />
            </View>
            <Text style={typography.h3}>{link.title}</Text>
            <Text style={[typography.caption, styles.desc]}>{link.description}</Text>
            <AppButton
              title="Open"
              variant="outline"
              style={styles.openBtn}
              onPress={() => navigation.navigate('Tabs', { screen: link.route })}
            />
          </AppCard>
        )
      })}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.xs,
  },
  sub: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    marginBottom: spacing.lg,
    marginTop: 4,
    lineHeight: 20,
  },
  module: { marginBottom: spacing.sm },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  desc: { marginTop: 4, marginBottom: spacing.md },
  openBtn: { alignSelf: 'flex-start' },
})
