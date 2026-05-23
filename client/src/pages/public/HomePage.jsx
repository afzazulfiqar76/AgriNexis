import { DashboardHeroSection } from '@/components/home/DashboardHeroSection'
import { HomeInsightsSection } from '@/components/home/HomeInsightsSection'

export function HomePage() {
  return (
    <div className="bg-base-200">
      <DashboardHeroSection />
      <HomeInsightsSection />
    </div>
  )
}
