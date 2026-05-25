import { Toaster } from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const AUTH_PATHS = new Set([ROUTES.SIGN_IN, ROUTES.SIGN_UP])

function isAuthPage(pathname) {
  return AUTH_PATHS.has(pathname)
}

export function AppToaster() {
  const { pathname } = useLocation()
  const authPage = isAuthPage(pathname)

  return (
    <Toaster
      position={authPage ? 'top-center' : 'top-right'}
      reverseOrder={false}
      gutter={0}
      containerClassName={
        authPage
          ? 'auth-toaster auth-toaster--center pointer-events-none !z-[10000]'
          : 'auth-toaster auth-toaster--corner pointer-events-none !z-[10000]'
      }
      toastOptions={{
        duration: 3200,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
        },
      }}
    />
  )
}
