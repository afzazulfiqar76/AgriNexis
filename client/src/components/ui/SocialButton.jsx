import { memo } from 'react'
import { Button } from '@/components/ui/Button'

function SocialButtonComponent({ icon, label, onClick }) {
  return (
    <Button type="button" variant="secondary" onClick={onClick} className="h-12 w-full gap-2.5">
      {icon}
      {label}
    </Button>
  )
}

export const SocialButton = memo(SocialButtonComponent)
