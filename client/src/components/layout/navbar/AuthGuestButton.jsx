import { CircleUser } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BTN_ICON } from '@/constants/uiClasses'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

export function AuthGuestButton() {
  return (
    <Link
      to={ROUTES.SIGN_UP}
      className={cn(BTN_ICON, 'size-10 text-gray-700')}
      aria-label="Sign up"
    >
      <CircleUser className="size-5" strokeWidth={2} aria-hidden="true" />
    </Link>
  )
}
