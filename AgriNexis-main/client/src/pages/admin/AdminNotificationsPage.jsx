import { useState } from 'react'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { DataTable } from '@/components/admin/ui/DataTable'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { INITIAL_ADMIN_NOTIFICATIONS } from '@/constants/admin/adminNotifications'

export function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_ADMIN_NOTIFICATIONS)

  function markRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'read' } : n)),
    )
  }

  const columns = [
    { key: 'title', header: 'Title', render: (r) => r.title },
    { key: 'recipient', header: 'Recipient', render: (r) => r.recipient },
    { key: 'type', header: 'Type', render: (r) => r.type },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    { key: 'date', header: 'Date', render: (r) => r.date },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) =>
        r.status !== 'read' ? (
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
            onClick={() => markRead(r.id)}
          >
            Mark read
          </button>
        ) : (
          '—'
        ),
    },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Notifications"
        subtitle="Platform alerts and delivery logs"
      />
      <DataTable columns={columns} rows={notifications} />
    </div>
  )
}
