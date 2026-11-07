import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
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
import { spacing, touchTarget } from '../../constants/spacing'
import { getErrorMessage } from '../../utils/errors'
import { showError, showInfo } from '../../lib/toast'

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
      compactBrand
      brandPanel={<BrandPanel compact />}
      authPanel={
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
            <View style={styles.remember}>
              <Checkbox
                checked={rememberMe}
                onToggle={() => setRememberMe((v) => !v)}
                label="Remember me"
              />
            </View>
            <Pressable
              onPress={() => showInfo('Password reset coming soon')}
              style={styles.forgotBtn}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
            >
              <Text style={styles.forgot} numberOfLines={1}>
                Forgot password?
              </Text>
            </Pressable>
          </View>
          <AppButton
            title={loading ? 'Signing in…' : 'Sign In'}
            onPress={handleLogin}
            loading={loading}
            large
            style={styles.btn}
          />
          <SocialLogin />
          <Pressable
            onPress={() => navigation.navigate(ROUTES.SIGN_UP)}
            style={styles.footer}
            accessibilityRole="link"
          >
            <Text style={styles.footerText}>
              New here? <Text style={styles.link}>Create account</Text>
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate(ROUTES.FAQS)} style={styles.explore}>
            <Text style={styles.exploreText}>Explore FAQs & resources</Text>
          </Pressable>
        </AuthCard>
      }
    />
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  remember: { flexGrow: 1, flexShrink: 1, minWidth: 140 },
  forgotBtn: {
    minHeight: touchTarget,
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    flexShrink: 0,
  },
  forgot: { fontSize: 14, fontFamily: fontFamily.medium, color: colors.primary },
  btn: { width: '100%', marginBottom: spacing.sm },
  footer: { marginTop: spacing.lg, alignItems: 'center', minHeight: touchTarget, justifyContent: 'center' },
  footerText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500, textAlign: 'center' },
  link: { color: colors.primary, fontFamily: fontFamily.semibold },
  explore: { marginTop: spacing.sm, alignItems: 'center', minHeight: touchTarget, justifyContent: 'center' },
  exploreText: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.gray500 },
})
