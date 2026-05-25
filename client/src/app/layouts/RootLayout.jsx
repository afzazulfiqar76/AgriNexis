import { Outlet } from 'react-router-dom'
import { AppToaster } from '@/components/ui/AppToaster'
import { AuthProvider } from '@/contexts/AuthContext'

export function RootLayout() {
  return (
    <AuthProvider>
      <AppToaster />
      <Outlet />
    </AuthProvider>
  )
}
