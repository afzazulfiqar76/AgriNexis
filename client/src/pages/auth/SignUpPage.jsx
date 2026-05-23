import { SignUpCard } from '@/components/auth/SignUpCard'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { BrandPanel } from '@/components/layout/BrandPanel'

export function SignUpPage() {
  return (
    <AuthLayout
      authPanelLabel="Sign up"
      brandPanel={<BrandPanel />}
      authPanel={<SignUpCard />}
    />
  )
}
