import { Navigate, Outlet } from 'react-router-dom'
import { USER_ROLES } from '@/constants/auth'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'

export function AdminRoute() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />
  }

  if (user?.role !== USER_ROLES.ADMIN) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Outlet />
}
