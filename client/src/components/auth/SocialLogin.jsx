import { FormDivider } from '@/components/forms/FormDivider'
import { SocialButton } from '@/components/ui/SocialButton'
import { GitHubIcon } from '@/components/ui/icons/GitHubIcon'
import { GoogleIcon } from '@/components/ui/icons/GoogleIcon'

export function SocialLogin() {
  return (
    <div className="flex flex-col gap-4">
      <FormDivider label="OR CONTINUE WITH" />
      <div className="grid grid-cols-2 gap-3">
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GitHubIcon />} label="GitHub" />
      </div>
    </div>
  )
}
