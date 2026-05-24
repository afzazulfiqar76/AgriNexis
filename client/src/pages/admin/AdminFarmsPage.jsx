import { useMemo, useState } from 'react'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { AdminSearchBar } from '@/components/admin/ui/AdminSearchBar'
import { DataTable } from '@/components/admin/ui/DataTable'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { INITIAL_ADMIN_FARMS } from '@/constants/admin/adminFarms'

export function AdminFarmsPage() {
  const [query, setQuery] = useState('')
  const farms = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INITIAL_ADMIN_FARMS
    return INITIAL_ADMIN_FARMS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.owner.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q),
    )
  }, [query])

  const columns = [
    { key: 'name', header: 'Farm', render: (r) => r.name },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'location', header: 'Location', render: (r) => r.location },
    { key: 'health', header: 'Health', render: (r) => `${r.healthScore}/100` },
    { key: 'plants', header: 'Plants', render: (r) => r.plantCount },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Farms" subtitle="Monitor urban farms and health scores" />
      <AdminSearchBar value={query} onChange={setQuery} placeholder="Search farms…" />
      <DataTable columns={columns} rows={farms} />
    </div>
  )
}
