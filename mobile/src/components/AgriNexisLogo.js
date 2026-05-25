import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Sprout, Zap } from 'lucide-react-native'
import { colors } from '../constants/theme'
import { radius } from '../constants/spacing'

export function AgriNexisLogo({ size = 48 }) {
  const badge = size * 0.375
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <LinearGradient
        colors={[colors.emerald500, colors.emerald600]}
        style={[styles.tile, { width: size, height: size, borderRadius: radius.md }]}
      >
        <Sprout size={size * 0.5} color="#fff" strokeWidth={2.25} />
      </LinearGradient>
      <View style={[styles.badge, { width: badge, height: badge, borderRadius: badge / 2 }]}>
        <Zap size={badge * 0.55} color="#fff" fill="#fff" strokeWidth={2} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
  tile: { alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.orange400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.base200,
  },
})
