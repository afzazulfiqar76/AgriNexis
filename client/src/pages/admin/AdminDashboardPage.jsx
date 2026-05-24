import { ActivityFeed } from '@/components/admin/ui/ActivityFeed'
import { AdminStatCard } from '@/components/admin/ui/AdminStatCard'
import { ChartPlaceholder } from '@/components/admin/ui/ChartPlaceholder'
import { DataTable } from '@/components/admin/ui/DataTable'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import {
  ADMIN_ACTIVITY_FEED,
  ADMIN_DASHBOARD_STATS,
  ADMIN_RECENT_USERS,
  ADMIN_SYSTEM_STATUS,
} from '@/constants/admin/adminDashboard'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function AdminDashboardPage() {
  const recentColumns = [
    { key: 'name', header: 'Name', render: (r) => r.name },
    { key: 'email', header: 'Email', render: (r) => r.email },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ADMIN_DASHBOARD_STATS.map((stat) => (
          <AdminStatCard key={stat.id} {...stat} />
        ))}
      </div>

      <InteractiveCard hover="none" className="p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
          System Status
        </h3>
        <div className="flex flex-wrap gap-3">
          {ADMIN_SYSTEM_STATUS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2"
            >
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </InteractiveCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartPlaceholder
          title="Platform Analytics"
          description="User growth and engagement trends"
        />
        <ChartPlaceholder title="IoT Readings" description="Sensor data over the last 7 days" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityFeed items={ADMIN_ACTIVITY_FEED} />
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
            Recent Users
          </h3>
          <DataTable
            columns={recentColumns}
            rows={ADMIN_RECENT_USERS}
            emptyMessage="No recent users."
          />
        </div>
      </div>
    </div>
  )
}
