import { SignInFooter } from '@/components/auth/SignInFooter'
import { SignInForm } from '@/components/auth/SignInForm'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { AuthCard } from '@/components/ui/AuthCard'

export function SignInCard() {
  return (
    <AuthCard
      title="Sign In"
      subtitle="Enter your credentials to access your account"
    >
      <SignInForm />
      <SocialLogin />
      <SignInFooter />
    </AuthCard>
  )
}
