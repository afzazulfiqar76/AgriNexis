import { SignUpFooter } from '@/components/auth/SignUpFooter'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { AuthCard } from '@/components/ui/AuthCard'

export function SignUpCard() {
  return (
    <AuthCard title="Sign Up" subtitle="Create your account to get started">
      <SignUpForm />
      <SocialLogin />
      <SignUpFooter />
    </AuthCard>
  )
}
