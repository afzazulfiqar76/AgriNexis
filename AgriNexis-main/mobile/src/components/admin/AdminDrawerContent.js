import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BarChart3,
  Bell,
  BrainCircuit,
  Gauge,
  Headphones,
  LayoutDashboard,
  Settings,
  Sprout,
  Users,
  UsersRound,
} from 'lucide-react-native'
import { AgriNexisLogo } from '../AgriNexisLogo'
import { ADMIN_NAV_ITEMS } from '../../constants/adminNavigation'
import { colors, fontFamily } from '../../constants/theme'
import { adminNavActive } from '../../constants/uiStyles'
import { spacing, touchTarget } from '../../constants/spacing'

const ICONS = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  sprout: Sprout,
  'brain-circuit': BrainCircuit,
  gauge: Gauge,
  'users-round': UsersRound,
  'bar-chart-3': BarChart3,
  bell: Bell,
  headphones: Headphones,
  settings: Settings,
}

export function AdminDrawerContent({ state, navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left']}>
      <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
        <View style={styles.brand}>
          <AgriNexisLogo size={40} />
          <View style={styles.brandText}>
            <Text style={styles.brandName}>AgriNexis</Text>
            <Text style={styles.brandSub}>Admin Panel</Text>
          </View>
        </View>
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = state.routes[state.index]?.name === item.route
          const Icon = ICONS[item.icon] ?? LayoutDashboard
          return (
            <Pressable
              key={item.route}
              style={[styles.item, active && adminNavActive]}
              onPress={() => navigation.navigate(item.route)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
            >
              <Icon size={20} color={active ? colors.primary : colors.gray600} strokeWidth={2} />
              <Text style={[styles.itemLabel, active && styles.itemLabelActive]} numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          )
        })}
        <Pressable
          style={styles.back}
          onPress={() => navigation.getParent()?.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back to site"
        >
          <Text style={styles.backText}>Back to site</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.base100 },
  wrap: { flex: 1 },
  content: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    marginBottom: spacing.md,
  },
  brandText: { flex: 1, minWidth: 0 },
  brandName: { fontSize: 14, fontFamily: fontFamily.bold, color: colors.emerald800 },
  brandSub: { fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray500 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: touchTarget,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    marginBottom: 2,
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray600,
  },
  itemLabelActive: { color: colors.primary, fontFamily: fontFamily.semibold },
  back: {
    marginTop: spacing.lg,
    padding: spacing.sm,
    minHeight: touchTarget,
    justifyContent: 'center',
  },
  backText: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500 },
})
