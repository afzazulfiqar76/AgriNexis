import { Outlet } from 'react-router-dom'
import { MainNavbar } from '@/components/layout/MainNavbar'
import { SiteFooter } from '@/components/layout/SiteFooter'

export function MainLayout() {
  return (
    <section className="flex min-h-dvh flex-col font-sans">
      <MainNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </section>
  )
}
