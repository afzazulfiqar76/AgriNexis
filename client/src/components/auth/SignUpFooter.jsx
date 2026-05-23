import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function SignUpFooter() {
  return (
    <p className="text-center text-sm text-gray-600">
      Already have an account?{' '}
      <Link
        to={ROUTES.SIGN_IN}
        className="font-semibold text-primary hover:underline"
      >
        Sign in
      </Link>
    </p>
  )
}
