import { HomeInsightsSection } from '@/components/home/HomeInsightsSection'

export function HomePage() {
  return (
    <div className="bg-base-200">
      <section className="px-4 pb-8 pt-12 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            AgriNexis Platform
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Manage your urban farming operations from a unified admin dashboard. Monitor
            sensor data, run AI diagnostics, and coordinate platform activity in one place.
          </p>
        </div>
      </section>

      <HomeInsightsSection />
    </div>
  )
}
