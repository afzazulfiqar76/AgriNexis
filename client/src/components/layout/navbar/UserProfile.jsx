import { Avatar } from '@/components/ui/Avatar'
import { MOCK_USER } from '@/constants/navigation'

export function UserProfile({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      {!compact && (
        <div className="hidden min-w-0 text-right sm:block">
          <p className="truncate text-sm font-semibold text-gray-900">{MOCK_USER.name}</p>
          <p className="truncate text-xs text-gray-500">{MOCK_USER.role}</p>
        </div>
      )}
      <Avatar
        initials={MOCK_USER.initials}
        size="md"
        aria-label={`${MOCK_USER.name} profile`}
      />
    </div>
  )
}
