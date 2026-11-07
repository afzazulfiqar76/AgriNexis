import { IotSensorsPageHeader } from '@/components/iot/IotSensorsPageHeader'
import { SensorStatsGrid } from '@/components/iot/SensorStatsGrid'
import { SmartIrrigationPanel } from '@/components/iot/SmartIrrigationPanel'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function IotSensorsPage() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <InteractiveCard panel hover="none" className="bg-white">
          <IotSensorsPageHeader />

          <div className="space-y-8 p-6 sm:p-8">
            <SensorStatsGrid />
            <SmartIrrigationPanel />
          </div>
        </InteractiveCard>
      </div>
    </div>
  )
}
