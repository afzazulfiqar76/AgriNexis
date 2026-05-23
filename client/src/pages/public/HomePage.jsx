import { DashboardHeroSection } from '@/components/home/DashboardHeroSection'
import { HomeInsightsSection } from '@/components/home/HomeInsightsSection'
import { UrbanFarmsSection } from '@/components/home/UrbanFarmsSection'

export function HomePage() {
  return (
    <div className="bg-base-200">
      <DashboardHeroSection />
      <UrbanFarmsSection />
      <HomeInsightsSection />
    </div>
  )
}
