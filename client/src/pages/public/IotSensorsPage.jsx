import { IotSensorsPageHeader } from '@/components/iot/IotSensorsPageHeader'
import { SensorStatsGrid } from '@/components/iot/SensorStatsGrid'
import { SmartIrrigationPanel } from '@/components/iot/SmartIrrigationPanel'

export function IotSensorsPage() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]">
          <IotSensorsPageHeader />

          <div className="space-y-8 p-6 sm:p-8">
            <SensorStatsGrid />
            <SmartIrrigationPanel />
          </div>
        </article>
      </div>
    </div>
  )
}
