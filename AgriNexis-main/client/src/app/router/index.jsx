import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { ROUTES } from '@/constants/routes'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { FarmAnalyticsPage } from '@/pages/dashboard/FarmAnalyticsPage'
import { HomePage } from '@/pages/public/HomePage'
import { CommunityPage } from '@/pages/public/CommunityPage'
import { AiDoctorPage } from '@/pages/public/AiDoctorPage'
import { IotSensorsPage } from '@/pages/public/IotSensorsPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { DocumentationPage } from '@/pages/public/DocumentationPage'
import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage'
import { FaqsPage } from '@/pages/public/FaqsPage'
import { AiChatPage } from '@/pages/AiChatPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { GuestRoute } from '@/routes/GuestRoute'
import { AdminRoute } from '@/routes/AdminRoute'
import { AdminLayout } from '@/app/layouts/AdminLayout'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { AdminFarmsPage } from '@/pages/admin/AdminFarmsPage'
import { AdminAiDoctorPage } from '@/pages/admin/AdminAiDoctorPage'
import { AdminIotMonitoringPage } from '@/pages/admin/AdminIotMonitoringPage'
import { AdminCommunityPage } from '@/pages/admin/AdminCommunityPage'
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage'
import { AdminNotificationsPage } from '@/pages/admin/AdminNotificationsPage'
import { AdminSupportPage } from '@/pages/admin/AdminSupportPage'
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage'
import { AdminProfilePage } from '@/pages/admin/AdminProfilePage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: ROUTES.SIGN_IN, element: <SignInPage /> },
          { path: ROUTES.SIGN_UP, element: <SignUpPage /> },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.CONTACT, element: <ContactPage /> },
          { path: ROUTES.DOCUMENTATION, element: <DocumentationPage /> },
          { path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicyPage /> },
          { path: ROUTES.FAQS, element: <FaqsPage /> },
        ],
      },
      { path: ROUTES.AICHAT, element: <AiChatPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <HomePage /> },
              { path: ROUTES.AI_DOCTOR, element: <AiDoctorPage /> },
              { path: ROUTES.IOT_SENSORS, element: <IotSensorsPage /> },
              { path: ROUTES.COMMUNITY, element: <CommunityPage /> },
              { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
              { path: ROUTES.ANALYTICS, element: <FarmAnalyticsPage /> },
            ],
          },
          {
            path: 'admin',
            element: <AdminRoute />,
            children: [
              {
                element: <AdminLayout />,
                children: [
                  { index: true, element: <Navigate to="dashboard" replace /> },
                  { path: 'dashboard', element: <AdminDashboardPage /> },
                  { path: 'users', element: <AdminUsersPage /> },
                  { path: 'farms', element: <AdminFarmsPage /> },
                  { path: 'ai-doctor', element: <AdminAiDoctorPage /> },
                  { path: 'iot-monitoring', element: <AdminIotMonitoringPage /> },
                  { path: 'community', element: <AdminCommunityPage /> },
                  { path: 'analytics', element: <AdminAnalyticsPage /> },
                  { path: 'notifications', element: <AdminNotificationsPage /> },
                  { path: 'support', element: <AdminSupportPage /> },
                  { path: 'settings', element: <AdminSettingsPage /> },
                  { path: 'profile', element: <AdminProfilePage /> },
                ],
              },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
    ],
  },
])
