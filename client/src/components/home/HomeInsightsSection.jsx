import { SmartAlertsCard } from '@/components/home/SmartAlertsCard'
import { WeatherForecastCard } from '@/components/home/WeatherForecastCard'

export function HomeInsightsSection() {
  return (
    <section
      aria-labelledby="farm-insights-heading"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
    >
      <h2 id="farm-insights-heading" className="sr-only">
        Farm insights
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeatherForecastCard />
        <SmartAlertsCard />
      </div>
    </section>
  )
}
