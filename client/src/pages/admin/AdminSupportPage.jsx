import { Link } from 'react-router-dom'
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader'
import { DataTable } from '@/components/admin/ui/DataTable'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { INITIAL_ADMIN_SUPPORT_REQUESTS } from '@/constants/admin/adminSupport'
import { ROUTES } from '@/constants/routes'
import { BTN_OUTLINE_EMERALD } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function AdminSupportPage() {
  const columns = [
    { key: 'name', header: 'Name', render: (r) => r.name },
    { key: 'email', header: 'Email', render: (r) => r.email },
    { key: 'type', header: 'Inquiry', render: (r) => r.inquiryType },
    {
      key: 'message',
      header: 'Message',
      render: (r) => <span className="line-clamp-2 max-w-xs">{r.message}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    { key: 'date', header: 'Date', render: (r) => r.date },
  ]

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Support Center"
        subtitle="Contact requests and help desk"
        action={
          <Link to={ROUTES.CONTACT} className={cn(BTN_OUTLINE_EMERALD, 'h-10 px-4 text-sm')}>
            Public contact page
          </Link>
        }
      />
      <DataTable columns={columns} rows={INITIAL_ADMIN_SUPPORT_REQUESTS} />
    </div>
  )
}
