import { useMemo, useState } from 'react'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { AdminSearchBar } from '@/components/admin/ui/AdminSearchBar'
import { AdminStatCard } from '@/components/admin/ui/AdminStatCard'
import { DataTable } from '@/components/admin/ui/DataTable'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { INITIAL_ADMIN_IOT_DEVICES, IOT_SUMMARY_STATS } from '@/constants/admin/adminIot'

export function AdminIotMonitoringPage() {
  const [query, setQuery] = useState('')
  const devices = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INITIAL_ADMIN_IOT_DEVICES
    return INITIAL_ADMIN_IOT_DEVICES.filter(
      (d) =>
        d.id.toLowerCase().includes(q) ||
        d.farm.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q),
    )
  }, [query])

  const columns = [
    { key: 'id', header: 'Device ID', render: (r) => r.id },
    { key: 'farm', header: 'Farm', render: (r) => r.farm },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    { key: 'last', header: 'Last Reading', render: (r) => r.lastReading },
    { key: 'sensors', header: 'Sensors', render: (r) => r.sensors },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="IoT Monitoring"
        subtitle="Sensor devices and live telemetry"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {IOT_SUMMARY_STATS.map((s) => (
          <AdminStatCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon="gauge"
            iconClassName={
              s.variant === 'success'
                ? 'bg-emerald-600 text-white'
                : s.variant === 'danger'
                  ? 'bg-red-500 text-white'
                  : 'bg-amber-500 text-white'
            }
          />
        ))}
      </div>
      <AdminSearchBar value={query} onChange={setQuery} placeholder="Search devices…" />
      <DataTable columns={columns} rows={devices} />
    </div>
  )
}
