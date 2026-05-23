import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { ROUTES } from '@/constants/routes'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { HomePage } from '@/pages/public/HomePage'
import { PlaceholderPage } from '@/pages/public/PlaceholderPage'
import { AiDoctorPage } from '@/pages/public/AiDoctorPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ROUTES.AI_DOCTOR, element: <AiDoctorPage /> },
          {
            path: ROUTES.IOT_SENSORS,
            element: (
              <PlaceholderPage
                title="IoT Sensors"
                description="View live sensor telemetry for soil moisture, temperature, and environmental conditions."
              />
            ),
          },
          {
            path: ROUTES.COMMUNITY,
            element: (
              <PlaceholderPage
                title="Community"
                description="Manage community engagement and platform-wide collaboration tools."
              />
            ),
          },
        ],
      },
      { path: ROUTES.SIGN_IN, element: <SignInPage /> },
      { path: ROUTES.SIGN_UP, element: <SignUpPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: ROUTES.DASHBOARD, element: <DashboardPage /> }],
      },
      { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
    ],
  },
])
