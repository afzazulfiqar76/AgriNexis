import { DashboardStatsGrid } from '@/components/home/DashboardStatsGrid'
import { WelcomeBanner } from '@/components/home/WelcomeBanner'

export function DashboardHeroSection() {
  return (
    <section
      aria-labelledby="dashboard-hero-heading"
      className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8"
    >
      <h2 id="dashboard-hero-heading" className="sr-only">
        Dashboard overview
      </h2>
      <div className="space-y-5">
        <WelcomeBanner />
        <DashboardStatsGrid />
      </div>
    </section>
  )
}
