import { Outlet } from 'react-router-dom'
import { AppToaster } from '@/components/ui/AppToaster'

export function RootLayout() {
  return (
    <>
      <AppToaster />
      <Outlet />
    </>
  )
}
