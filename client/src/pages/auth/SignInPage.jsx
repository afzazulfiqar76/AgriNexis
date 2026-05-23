import { SignInCard } from '@/components/auth/SignInCard'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { BrandPanel } from '@/components/layout/BrandPanel'

export function SignInPage() {
  return (
    <AuthLayout
      authPanelLabel="Sign in"
      brandPanel={<BrandPanel />}
      authPanel={<SignInCard />}
    />
  )
}
