import { Droplets, Leaf, Shield, Sprout } from 'lucide-react'
import { DashboardStatCard } from '@/components/home/DashboardStatCard'
import { DASHBOARD_STATS } from '@/constants/dashboardStats'
import { useAuth } from '@/contexts/AuthContext'
import { useFarms } from '@/contexts/FarmsContext'

const STAT_ICONS = {
  sprout: Sprout,
  leaf: Leaf,
  shield: Shield,
  droplets: Droplets,
}

/** Replace the demo numbers with real ones from /api/farms/summary/ */
function applySummary(stat, summary) {
  if (!summary) return stat
  if (stat.id === 'active-farms') {
    return { ...stat, value: String(summary.active_farms), footer: 'Your registered farms' }
  }
  if (stat.id === 'total-plants') {
    return {
      ...stat,
      value: String(summary.total_plants),
      footer: { prefix: 'Health: ', highlight: `${summary.average_health}/100` },
    }
  }
  return stat
}

export function DashboardStatsGrid() {
  const { isAuthenticated } = useAuth()
  const { summary } = useFarms()

  const stats = DASHBOARD_STATS.map((stat) =>
    applySummary(stat, isAuthenticated ? summary : null),
  )

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.icon]

        return (
          <DashboardStatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            footer={stat.footer}
            footerClassName={stat.footerClassName}
            footerHighlightClassName={stat.footerHighlightClassName}
            cardClassName={stat.cardClassName}
            valueClassName={stat.valueClassName}
            icon={<Icon className="size-5" strokeWidth={2} aria-hidden="true" />}
            iconClassName={stat.iconClassName}
            progress={stat.progress}
            progressClassName={stat.progressClassName}
            progressTrackClassName={stat.progressTrackClassName}
          />
        )
      })}
    </div>
  )
}
