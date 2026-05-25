import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { Lock, Mail } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { AppButton } from '../../components/AppButton'
import { AuthCard } from '../../components/AuthCard'
import { BrandPanel } from '../../components/BrandPanel'
import { Checkbox } from '../../components/Checkbox'
import { InputField } from '../../components/InputField'
import { SocialLogin } from '../../components/SocialLogin'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import { colors, fontFamily } from '../../constants/theme'
import { ROUTES } from '../../constants/routes'
import { spacing } from '../../constants/spacing'
import { getErrorMessage } from '../../utils/errors'
import { showError } from '../../lib/toast'

export function LoginScreen({ navigation }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      showError('Email and password are required.')
      return
    }
    setLoading(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      showError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      brandPanel={<BrandPanel />}
      authPanel={
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <AuthCard title="Sign In" subtitle="Enter your credentials to access your account">
            <InputField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              leftIcon={<Mail size={18} color={colors.gray400} strokeWidth={2} />}
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={18} color={colors.gray400} strokeWidth={2} />}
            />
            <View style={styles.row}>
              <Checkbox checked={rememberMe} onToggle={() => setRememberMe((v) => !v)} label="Remember me" />
              <Pressable>
                <Text style={styles.forgot}>Forgot password?</Text>
              </Pressable>
            </View>
            <AppButton title={loading ? 'Signing in…' : 'Sign In'} onPress={handleLogin} loading={loading} large style={styles.btn} />
            <SocialLogin />
            <Pressable onPress={() => navigation.navigate(ROUTES.SIGN_UP)} style={styles.footer}>
              <Text style={styles.footerText}>
                New here? <Text style={styles.link}>Create account</Text>
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate(ROUTES.FAQS)} style={styles.explore}>
              <Text style={styles.exploreText}>Explore FAQs & resources</Text>
            </Pressable>
          </AuthCard>
        </KeyboardAvoidingView>
      }
    />
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  forgot: { fontSize: 14, fontFamily: fontFamily.medium, color: colors.primary },
  btn: { width: '100%', marginBottom: spacing.sm },
  footer: { marginTop: spacing.lg, alignItems: 'center' },
  footerText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500 },
  link: { color: colors.primary, fontFamily: fontFamily.semibold },
  explore: { marginTop: spacing.md, alignItems: 'center' },
  exploreText: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.gray500 },
})
