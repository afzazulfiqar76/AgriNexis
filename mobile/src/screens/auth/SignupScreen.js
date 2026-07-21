import { useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Lock, Mail, User } from 'lucide-react-native'
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
import { showError } from '../../lib/toast'

export function SignupScreen({ navigation }) {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password) {
      showError('Name, email, and password are required.')
      return
    }
    if (!terms) {
      showError('Please accept the terms and conditions.')
      return
    }
    setLoading(true)
    try {
      await register({
        fullName: name.trim(),
        email: email.trim(),
        password,
        phoneNumber: phone.trim() || undefined,
      })
    } catch (err) {
      showError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      compactBrand
      brandPanel={<BrandPanel headline="Join AgriNexis" compact />}
      authPanel={
        <AuthCard title="Create Account" subtitle="Start your urban farming journey today">
          <InputField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            autoCapitalize="words"
            leftIcon={<User size={18} color={colors.gray400} strokeWidth={2} />}
          />
          <InputField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            leftIcon={<Mail size={18} color={colors.gray400} strokeWidth={2} />}
          />
          <InputField
            label="Phone (optional)"
            value={phone}
            onChangeText={setPhone}
            placeholder="+92 300 0000000"
            keyboardType="phone-pad"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            leftIcon={<Lock size={18} color={colors.gray400} strokeWidth={2} />}
          />
          <Checkbox
            checked={terms}
            onToggle={() => setTerms((v) => !v)}
            label="I agree to the Terms of Service and Privacy Policy"
          />
          <AppButton
            title={loading ? 'Creating account…' : 'Sign Up'}
            onPress={handleSignup}
            loading={loading}
            large
            style={styles.btn}
          />
          <SocialLogin />
          <Pressable onPress={() => navigation.goBack()} style={styles.footer} accessibilityRole="link">
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.link}>Sign in</Text>
            </Text>
          </Pressable>
        </AuthCard>
      }
    />
  )
}

const styles = StyleSheet.create({
  btn: { width: '100%', marginTop: spacing.sm },
  footer: {
    marginTop: spacing.lg,
    alignItems: 'center',
    minHeight: touchTarget,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    textAlign: 'center',
  },
  link: { color: colors.primary, fontFamily: fontFamily.semibold },
})
