import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BarChart3, Plus } from 'lucide-react-native'
import { AppButton } from './AppButton'
import { colors, fontFamily, shadows } from '../constants/theme'
import { radius, spacing } from '../constants/spacing'

export function WelcomeBanner({ userName = 'Farmer', onAddFarm, onViewAnalytics }) {
  return (
    <LinearGradient
      colors={[colors.primary, colors.emerald700]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.banner, shadows.hero]}
    >
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          Welcome back, {userName}!
        </Text>
        <Text style={styles.sub}>
          Your urban farms are thriving with 87% average health score
        </Text>
        <View style={styles.actions}>
          <AppButton
            variant="outline"
            title="Add New Farm"
            icon={<Plus size={16} color={colors.text} strokeWidth={2.5} />}
            style={styles.actionBtn}
            textStyle={{ color: colors.text }}
            onPress={onAddFarm}
          />
          <AppButton
            variant="ghost"
            title="View Analytics"
            icon={<BarChart3 size={16} color="#fff" strokeWidth={2} />}
            style={styles.ghostBtn}
            textStyle={{ color: '#fff' }}
            onPress={onViewAnalytics}
          />
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.lg,
    padding: spacing.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(6, 95, 70, 0.3)',
  },
  circleTop: { width: 160, height: 160, top: -70, right: -50 },
  circleBottom: {
    width: 100,
    height: 100,
    bottom: -40,
    right: 60,
    backgroundColor: 'rgba(6, 95, 70, 0.2)',
  },
  content: { zIndex: 1 },
  title: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: -0.5,
  },
  sub: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionBtn: { backgroundColor: '#fff', borderColor: colors.gray200 },
  ghostBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
})
