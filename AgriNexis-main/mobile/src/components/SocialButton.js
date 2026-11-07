import { AppButton } from './AppButton'
import { StyleSheet, View } from 'react-native'
import { spacing } from '../constants/spacing'

export function SocialButton({ icon, label, onPress }) {
  return (
    <AppButton
      variant="secondary"
      onPress={onPress ?? (() => {})}
      large
      style={styles.btn}
      icon={<View style={styles.icon}>{icon}</View>}
      title={label}
      textStyle={styles.label}
      accessibilityLabel={`Continue with ${label}`}
    />
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: spacing.md,
  },
  icon: { flexShrink: 0 },
  label: { flexShrink: 1 },
})
