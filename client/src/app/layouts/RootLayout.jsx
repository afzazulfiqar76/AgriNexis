import { Outlet } from 'react-router-dom'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { AppToaster } from '@/components/ui/AppToaster'
import { AuthProvider } from '@/contexts/AuthContext'

export function RootLayout() {
  return (
    <AuthProvider>
      <AppToaster />
      <Outlet />
      <ChatWidget />
    </AuthProvider>
  )
}
