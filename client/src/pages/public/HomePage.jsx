import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function HomePage() {
  return <Navigate to={ROUTES.SIGN_IN} replace />
}
