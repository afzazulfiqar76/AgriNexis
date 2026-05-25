import { StyleSheet, Text, View } from 'react-native'
import { BarChart3, LayoutGrid, Sprout } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { AppButton } from '../../components/AppButton'
import { ScreenContainer } from '../../components/ScreenContainer'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const MODULES = [
  { id: 'farms', title: 'Farm Management', desc: 'Plots, health scores, crop plans', icon: Sprout },
  { id: 'analytics', title: 'Analytics', desc: 'Yield trends and resource usage', icon: BarChart3 },
  { id: 'modules', title: 'All Modules', desc: 'AI Doctor, IoT, Community hub', icon: LayoutGrid },
]

export function DashboardScreen() {
  return (
    <ScreenContainer>
      <Text style={typography.h2}>My Dashboard</Text>
      <Text style={styles.sub}>Central hub for farms, analytics, and quick actions</Text>
      {MODULES.map((mod) => {
        const Icon = mod.icon
        return (
          <AppCard key={mod.id} style={styles.module}>
            <View style={styles.moduleRow}>
              <View style={styles.iconWrap}>
                <Icon size={22} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.moduleBody}>
                <Text style={typography.h3}>{mod.title}</Text>
                <Text style={typography.caption}>{mod.desc}</Text>
              </View>
            </View>
            <AppButton title="Open" variant="outline" style={styles.openBtn} />
          </AppCard>
        )
      })}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  sub: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500, marginBottom: spacing.lg, marginTop: 4 },
  module: { marginBottom: spacing.sm },
  moduleRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 163, 108, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleBody: { flex: 1 },
  openBtn: { alignSelf: 'flex-start' },
})
