import { ActiveChallengeCard } from '@/components/community/ActiveChallengeCard'
import { CommunityFeedSection } from '@/components/community/CommunityFeedSection'
import { LeaderboardCard } from '@/components/community/LeaderboardCard'

export function CommunityPage() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
          <CommunityFeedSection />
          <aside className="space-y-6">
            <LeaderboardCard />
            <ActiveChallengeCard />
          </aside>
        </div>
      </div>
    </div>
  )
}
