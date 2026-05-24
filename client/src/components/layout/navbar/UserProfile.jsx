import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/contexts/AuthContext'
import { MOCK_USER } from '@/constants/navigation'

export function UserProfile({ compact = false }) {
  const { user } = useAuth()
  const profile = user ?? MOCK_USER

  return (
    <div className="flex items-center gap-3 transition-transform duration-300 ease-out md:hover:scale-[1.02]">
      {!compact && (
        <div className="hidden min-w-0 text-right sm:block">
          <p className="truncate text-sm font-semibold text-gray-900">{profile.name}</p>
          <p className="truncate text-xs text-gray-500">{profile.role}</p>
        </div>
      )}
      <Avatar
        initials={profile.initials}
        size="md"
        aria-label={`${profile.name} profile`}
        className="shadow-sm transition-shadow duration-300 hover:shadow-md"
      />
    </div>
  )
}
