import { StyleSheet, Text, View } from 'react-native'
import { Leaf, Shield, Users, Zap } from 'lucide-react-native'
import { AppCard } from './AppCard'
import { colors, fontFamily } from '../constants/theme'
import { spacing } from '../constants/spacing'

const ICONS = {
  leaf: Leaf,
  zap: Zap,
  shield: Shield,
  users: Users,
}

export function FeatureCard({ label, icon, iconBg, iconColor }) {
  const Icon = ICONS[icon] ?? Leaf
  return (
    <AppCard style={styles.card} padding={spacing.md}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Icon size={18} color={iconColor} strokeWidth={2} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: '45%' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 14, fontFamily: fontFamily.medium, color: colors.gray800, flex: 1 },
})
