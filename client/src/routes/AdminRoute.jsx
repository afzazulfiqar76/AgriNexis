import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { USER_ROLES } from '@/constants/auth'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'

export function AdminRoute() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.SIGN_IN} replace state={{ from: location }} />
    )
  }

  if (user?.role !== USER_ROLES.ADMIN) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Outlet />
}
