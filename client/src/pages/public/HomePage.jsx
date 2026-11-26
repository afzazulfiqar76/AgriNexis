import { DashboardHeroSection } from '@/components/home/DashboardHeroSection'
import { HomeInsightsSection } from '@/components/home/HomeInsightsSection'
import { UrbanFarmsSection } from '@/components/home/UrbanFarmsSection'
import { FarmsProvider } from '@/contexts/FarmsContext'

export function HomePage() {
  return (
    // FarmsProvider lets the banner buttons, stat cards and farm list share one farms list
    <FarmsProvider>
      <div className="bg-base-200">
        <DashboardHeroSection />
        <UrbanFarmsSection />
        <HomeInsightsSection />
      </div>
    </FarmsProvider>
  )
}
