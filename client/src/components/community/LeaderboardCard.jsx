import { BarChart3 } from 'lucide-react'
import { LeaderboardItem } from '@/components/community/LeaderboardItem'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { COMMUNITY_LEADERBOARD } from '@/constants/communityLeaderboard'
import { MOCK_USER } from '@/constants/navigation'

export function LeaderboardCard() {
  return (
    <InteractiveCard hover="none" className="bg-white p-6">
      <header className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
          <BarChart3 className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-bold text-gray-900">Leaderboard</h2>
          <p className="text-xs text-gray-500">Top eco-friendly farmers</p>
        </div>
      </header>

      <div className="mt-4 space-y-2">
        {COMMUNITY_LEADERBOARD.map((entry) => (
          <LeaderboardItem
            key={entry.id}
            name={entry.isCurrentUser ? `You (${MOCK_USER.name})` : entry.name}
            score={entry.score}
            badgeClassName={entry.badgeClassName}
            isCurrentUser={entry.isCurrentUser}
          />
        ))}
      </div>
    </InteractiveCard>
  )
}
