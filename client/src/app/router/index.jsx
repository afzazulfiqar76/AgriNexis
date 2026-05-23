import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { ROUTES } from '@/constants/routes'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { HomePage } from '@/pages/public/HomePage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.SIGN_IN, element: <SignInPage /> },
      { path: ROUTES.SIGN_UP, element: <SignUpPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: ROUTES.DASHBOARD, element: <DashboardPage /> }],
      },
      { path: '*', element: <Navigate to={ROUTES.SIGN_IN} replace /> },
    ],
  },
])
