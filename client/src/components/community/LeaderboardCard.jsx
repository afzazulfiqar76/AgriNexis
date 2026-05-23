import { BarChart3 } from 'lucide-react'
import { LeaderboardItem } from '@/components/community/LeaderboardItem'
import { COMMUNITY_LEADERBOARD } from '@/constants/communityLeaderboard'
import { MOCK_USER } from '@/constants/navigation'

const CARD_SHADOW =
  'shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]'

export function LeaderboardCard() {
  return (
    <article
      className={`rounded-2xl border border-gray-100 bg-white p-6 ${CARD_SHADOW}`}
    >
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
    </article>
  )
}
