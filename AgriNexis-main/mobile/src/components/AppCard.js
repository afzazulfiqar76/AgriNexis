import { Pressable, StyleSheet, View } from 'react-native'
import { cardSurface } from '../constants/uiStyles'
import { spacing } from '../constants/spacing'

export function AppCard({ children, onPress, style, padding = spacing.md }) {
  const content = <View style={[styles.card, { padding }, style]}>{children}</View>
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        {content}
      </Pressable>
    )
  }
  return content
}

const styles = StyleSheet.create({
  card: { ...cardSurface },
  pressed: { opacity: 0.92 },
})
