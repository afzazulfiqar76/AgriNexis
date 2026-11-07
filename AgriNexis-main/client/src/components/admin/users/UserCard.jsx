import { StatusBadge } from '@/components/admin/ui/StatusBadge'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { BTN_GHOST } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function UserCard({ user, onView, onSuspend }) {
  return (
    <InteractiveCard hover="none" className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900">{user.fullName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {user.userType} · {user.farmCount} farms
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => onView(user)} className={cn(BTN_GHOST, 'text-xs')}>
          View
        </button>
        <button type="button" onClick={() => onSuspend(user.id)} className={cn(BTN_GHOST, 'text-xs')}>
          Suspend
        </button>
      </div>
    </InteractiveCard>
  )
}
