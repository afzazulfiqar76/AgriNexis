import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function SignInFooter() {
  return (
    <p className="text-center text-sm text-gray-600">
      Don&apos;t have an account?{' '}
      <Link
        to={ROUTES.SIGN_UP}
        className="font-semibold text-primary hover:underline"
      >
        Sign up now
      </Link>
    </p>
  )
}
