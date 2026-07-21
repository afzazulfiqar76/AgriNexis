import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Guest-only routes (sign-in / sign-up).
 * Authenticated users are sent to the main site home — never to the Admin Panel.
 */
export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname
    const safeFrom =
      typeof from === 'string' &&
      from.startsWith('/') &&
      !from.startsWith(ROUTES.SIGN_IN) &&
      !from.startsWith(ROUTES.SIGN_UP) &&
      !from.startsWith(ROUTES.ADMIN)
        ? from
        : ROUTES.HOME
    return <Navigate to={safeFrom} replace />
  }

  return <Outlet />
}
