import { SensorStatCard } from '@/components/iot/SensorStatCard'
import { SENSOR_STATS } from '@/constants/iotSensors'

export function SensorStatsGrid() {
  return (
    <section aria-label="Sensor statistics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SENSOR_STATS.map((sensor) => (
          <SensorStatCard key={sensor.id} {...sensor} />
        ))}
      </div>
    </section>
  )
}
