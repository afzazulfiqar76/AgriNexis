import { StyleSheet, View } from 'react-native'
import { FormDivider } from './FormDivider'
import { SocialButton } from './SocialButton'
import { GoogleIcon } from './icons/GoogleIcon'
import { GitHubIcon } from './icons/GitHubIcon'
import { showInfo } from '../lib/toast'
import { spacing } from '../constants/spacing'

export function SocialLogin() {
  return (
    <View style={styles.wrap}>
      <FormDivider />
      <View style={styles.row}>
        <SocialButton
          icon={<GoogleIcon />}
          label="Google"
          onPress={() => showInfo('Google sign-in coming soon')}
        />
        <SocialButton
          icon={<GitHubIcon />}
          label="GitHub"
          onPress={() => showInfo('GitHub sign-in coming soon')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.sm },
})
