import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { ROUTES } from '@/constants/routes'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { HomePage } from '@/pages/public/HomePage'
import { CommunityPage } from '@/pages/public/CommunityPage'
import { AiDoctorPage } from '@/pages/public/AiDoctorPage'
import { IotSensorsPage } from '@/pages/public/IotSensorsPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { DocumentationPage } from '@/pages/public/DocumentationPage'
import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage'
import { FaqsPage } from '@/pages/public/FaqsPage'
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
          { path: ROUTES.IOT_SENSORS, element: <IotSensorsPage /> },
          { path: ROUTES.COMMUNITY, element: <CommunityPage /> },
          { path: ROUTES.CONTACT, element: <ContactPage /> },
          { path: ROUTES.DOCUMENTATION, element: <DocumentationPage /> },
          { path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
          { path: ROUTES.FAQS, element: <FaqsPage /> },
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
