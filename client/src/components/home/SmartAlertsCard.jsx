import { AlertTriangle, Bell, CheckCircle, CloudRain } from 'lucide-react'
import { AlertItem } from '@/components/home/AlertItem'
import { DashboardPanelHeader } from '@/components/home/DashboardPanelHeader'
import { SMART_ALERTS } from '@/constants/smartAlerts'

const ALERT_ICONS = {
  'alert-triangle': AlertTriangle,
  'check-circle': CheckCircle,
  'cloud-rain': CloudRain,
}

export function SmartAlertsCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
      <DashboardPanelHeader
        title="Smart Alerts"
        headerClassName="bg-amber-50"
        iconClassName="bg-orange-400 text-white"
        icon={<Bell className="size-5" strokeWidth={2} aria-hidden="true" />}
      />

      <section className="space-y-3 p-5">
        {SMART_ALERTS.map(({ id, variant, message, timeAgo, icon }) => {
          const Icon = ALERT_ICONS[icon]
          return (
            <AlertItem
              key={id}
              variant={variant}
              message={message}
              timeAgo={timeAgo}
              icon={<Icon className="size-5" strokeWidth={2} aria-hidden="true" />}
            />
          )
        })}
      </section>
    </article>
  )
}
