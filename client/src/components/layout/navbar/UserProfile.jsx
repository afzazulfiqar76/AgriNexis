import { Avatar } from '@/components/ui/Avatar'
import { MOCK_USER } from '@/constants/navigation'

export function UserProfile({ compact = false }) {
  return (
    <div className="flex items-center gap-3 transition-transform duration-300 ease-out md:hover:scale-[1.02]">
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
        className="shadow-sm transition-shadow duration-300 hover:shadow-md"
      />
    </div>
  )
}
