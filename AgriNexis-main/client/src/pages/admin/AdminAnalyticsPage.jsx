import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { AdminStatCard } from '@/components/admin/ui/AdminStatCard'
import { ChartPlaceholder } from '@/components/admin/ui/ChartPlaceholder'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { ADMIN_ANALYTICS_METRICS, ADMIN_TOP_FARMS } from '@/constants/admin/adminAnalytics'

export function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        subtitle="Usage trends and performance metrics"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_ANALYTICS_METRICS.map((m) => (
          <AdminStatCard
            key={m.id}
            label={m.label}
            value={m.value}
            trend={m.change}
            icon="chart"
            iconClassName="bg-primary text-white"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartPlaceholder title="User Growth" />
        <ChartPlaceholder title="Farm Health Trends" />
        <ChartPlaceholder title="Resource Usage" />
      </div>
      <InteractiveCard hover="none" className="p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
          Top Performing Farms
        </h3>
        <ul className="space-y-3">
          {ADMIN_TOP_FARMS.map((farm) => (
            <li
              key={farm.rank}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3"
            >
              <div>
                <span className="text-xs font-bold text-primary">#{farm.rank}</span>
                <p className="font-semibold text-gray-900">{farm.name}</p>
                <p className="text-xs text-gray-500">{farm.owner}</p>
              </div>
              <p className="text-lg font-bold text-emerald-600">{farm.score}</p>
            </li>
          ))}
        </ul>
      </InteractiveCard>
    </div>
  )
}
