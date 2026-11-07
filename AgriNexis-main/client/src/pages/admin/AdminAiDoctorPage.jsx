import { useMemo, useState } from 'react'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { AdminSearchBar } from '@/components/admin/ui/AdminSearchBar'
import { DataTable } from '@/components/admin/ui/DataTable'
import { INITIAL_ADMIN_DIAGNOSES } from '@/constants/admin/adminAiDoctor'

export function AdminAiDoctorPage() {
  const [query, setQuery] = useState('')
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INITIAL_ADMIN_DIAGNOSES
    return INITIAL_ADMIN_DIAGNOSES.filter(
      (d) =>
        d.user.toLowerCase().includes(q) ||
        d.crop.toLowerCase().includes(q) ||
        d.result.toLowerCase().includes(q),
    )
  }, [query])

  const columns = [
    { key: 'user', header: 'User', render: (r) => r.user },
    { key: 'crop', header: 'Crop', render: (r) => r.crop },
    { key: 'result', header: 'Diagnosis', render: (r) => r.result },
    { key: 'confidence', header: 'Confidence', render: (r) => `${r.confidence}%` },
    { key: 'date', header: 'Date', render: (r) => r.date },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="AI Doctor"
        subtitle="Plant diagnosis records and model activity"
      />
      <AdminSearchBar value={query} onChange={setQuery} placeholder="Search diagnoses…" />
      <DataTable columns={columns} rows={rows} />
    </div>
  )
}
