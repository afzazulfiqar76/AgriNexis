import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

function isAuthenticated() {
  return false
}

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.SIGN_IN} replace />
  }

  return <Outlet />
}
