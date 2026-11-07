import { AdminModal } from '@/components/admin/ui/AdminModal'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'

export function UserDetailModal({ user, isOpen, onClose }) {
  if (!user) return null

  const fields = [
    { label: 'Full Name', value: user.fullName },
    { label: 'Email', value: user.email },
    { label: 'Role', value: user.userType },
    { label: 'Account Status', value: user.status },
    { label: 'Activity', value: user.activityStatus },
    { label: 'Registered', value: user.registeredAt },
    { label: 'Last Login', value: user.lastLogin },
    { label: 'Farm Count', value: String(user.farmCount) },
  ]

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title="User Details">
      <div className="mb-4">
        <StatusBadge status={user.status} />
      </div>
      <dl className="space-y-3">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
              {field.label}
            </dt>
            <dd className="mt-0.5 text-sm font-medium text-gray-900">{field.value}</dd>
          </div>
        ))}
      </dl>
    </AdminModal>
  )
}
