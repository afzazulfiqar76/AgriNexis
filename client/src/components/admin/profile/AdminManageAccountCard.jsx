import { Pencil } from 'lucide-react'
import { ProfileField } from '@/components/admin/profile/ProfileField'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { BTN_GHOST, BTN_PRIMARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

function formatStatus(status) {
  if (!status) return '—'
  const text = String(status).replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function AdminManageAccountCard({ profile, onEdit, onChangePassword }) {
  return (
    <InteractiveCard hover="none" className="sm:p-7">
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-gray-900">Personal information</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onChangePassword}
            className={cn(BTN_GHOST, 'px-3 py-2 text-xs font-bold uppercase tracking-wide')}
          >
            Change Password
          </button>
          <button
            type="button"
            onClick={onEdit}
            className={cn(BTN_PRIMARY, 'px-4 py-2 text-xs font-bold uppercase tracking-wide')}
          >
            <Pencil className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-7">
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Username" value={profile.username} />
        <ProfileField label="First Name" value={profile.firstName} />
        <ProfileField label="Last Name" value={profile.lastName} />
        <ProfileField label="Phone" value={profile.phone} />
        <ProfileField label="Role" value={profile.roleLabel} />
        <ProfileField label="Account Status">
          <StatusBadge status={profile.accountStatus} label={formatStatus(profile.accountStatus)} />
        </ProfileField>
        <ProfileField label="Joined Date" value={profile.joinedDate} />
        <ProfileField label="Address" value={profile.address} />
        <ProfileField label="Department" value={profile.department} />
      </div>
    </InteractiveCard>
  )
}
