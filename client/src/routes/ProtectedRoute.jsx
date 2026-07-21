import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
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

  return <Outlet />
}
