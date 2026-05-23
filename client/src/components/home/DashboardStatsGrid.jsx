import { Droplets, Leaf, Shield, Sprout } from 'lucide-react'
import { DashboardStatCard } from '@/components/home/DashboardStatCard'
import { DASHBOARD_STATS } from '@/constants/dashboardStats'

const STAT_ICONS = {
  sprout: Sprout,
  leaf: Leaf,
  shield: Shield,
  droplets: Droplets,
}

export function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {DASHBOARD_STATS.map((stat) => {
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
