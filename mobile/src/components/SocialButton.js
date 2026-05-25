import { AppButton } from './AppButton'
import { StyleSheet, View } from 'react-native'

export function SocialButton({ icon, label, onPress }) {
  return (
    <AppButton
      variant="secondary"
      onPress={onPress ?? (() => {})}
      large
      style={styles.btn}
      icon={<View>{icon}</View>}
      title={label}
    />
  )
}

const styles = StyleSheet.create({
  btn: { flex: 1 },
})
