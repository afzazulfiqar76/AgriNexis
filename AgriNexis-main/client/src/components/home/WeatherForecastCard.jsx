import {
  Cloud,
  Droplets,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { DashboardPanelHeader } from '@/components/home/DashboardPanelHeader'
import { WeatherStatTile } from '@/components/home/WeatherStatTile'
import { WEATHER_FORECAST } from '@/constants/weatherForecast'

const STAT_ICONS = {
  thermometer: Thermometer,
  droplets: Droplets,
  wind: Wind,
}

export function WeatherForecastCard() {
  const { dateLabel, temperature, condition, stats } = WEATHER_FORECAST

  return (
    <InteractiveCard hover="none" className="overflow-hidden bg-white">
      <DashboardPanelHeader
        title="Weather Forecast"
        headerClassName="bg-sky-50"
        iconClassName="bg-sky-500 text-white"
        icon={<Cloud className="size-5" strokeWidth={2} aria-hidden="true" />}
      />

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between rounded-xl bg-sky-50 px-5 py-4">
          <div>
            <p className="text-sm text-gray-500">{dateLabel}</p>
            <p className="mt-1 text-4xl font-bold text-gray-900">{temperature}</p>
            <p className="mt-1 text-sm font-medium text-gray-600">{condition}</p>
          </div>
          <Sun
            className="size-14 shrink-0 text-amber-400"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map(({ id, label, value, icon, iconBg, iconColor }) => {
            const Icon = STAT_ICONS[icon]
            return (
              <WeatherStatTile
                key={id}
                label={label}
                value={value}
                iconBg={iconBg}
                iconColor={iconColor}
                icon={<Icon className="size-5" strokeWidth={2} aria-hidden="true" />}
              />
            )
          })}
        </div>
      </div>
    </InteractiveCard>
  )
}
