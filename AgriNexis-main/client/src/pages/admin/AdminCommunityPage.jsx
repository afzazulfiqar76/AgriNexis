import { useState } from 'react'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { DataTable } from '@/components/admin/ui/DataTable'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { INITIAL_ADMIN_POSTS } from '@/constants/admin/adminCommunity'

export function AdminCommunityPage() {
  const [posts, setPosts] = useState(INITIAL_ADMIN_POSTS)

  function updateStatus(id, status) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  const columns = [
    { key: 'author', header: 'Author', render: (r) => r.author },
    {
      key: 'content',
      header: 'Content',
      render: (r) => (
        <span className="line-clamp-2 max-w-xs">{r.content}</span>
      ),
    },
    { key: 'flags', header: 'Flags', render: (r) => r.flags },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    { key: 'date', header: 'Date', render: (r) => r.date },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
            onClick={() => updateStatus(r.id, 'approved')}
          >
            Approve
          </button>
          <button
            type="button"
            className="text-xs font-medium text-red-600 hover:underline"
            onClick={() => updateStatus(r.id, 'hidden')}
          >
            Hide
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Community"
        subtitle="Moderate posts and challenges"
      />
      <DataTable columns={columns} rows={posts} />
    </div>
  )
}
