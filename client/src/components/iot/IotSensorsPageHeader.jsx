import { Gauge } from 'lucide-react'

export function IotSensorsPageHeader() {
  return (
    <header className="rounded-t-2xl border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50/60 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
          <Gauge className="size-6" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            IoT Sensor Monitoring
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">
            Real-time environmental data from your farm sensors (ESP32 + DHT11)
          </p>
        </div>
      </div>
    </header>
  )
}
