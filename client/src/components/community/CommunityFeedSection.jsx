import { Users } from 'lucide-react'
import { PostCard } from '@/components/community/PostCard'
import { COMMUNITY_POSTS } from '@/constants/communityPosts'

const CARD_SHADOW =
  'shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]'

export function CommunityFeedSection() {
  return (
    <section aria-labelledby="community-feed-heading">
      <article
        className={`overflow-hidden rounded-2xl border border-gray-100 bg-white ${CARD_SHADOW}`}
      >
        <header className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
            <Users className="size-5" strokeWidth={2} aria-hidden="true" />
          </span>
          <h2 id="community-feed-heading" className="text-lg font-bold text-gray-900">
            Community Feed
          </h2>
        </header>

        <div className="space-y-4 p-6">
          {COMMUNITY_POSTS.map((post) => (
            <PostCard
              key={post.id}
              authorName={post.authorName}
              initials={post.initials}
              timeAgo={post.timeAgo}
              content={post.content}
              likeCount={post.likeCount}
            />
          ))}
        </div>
      </article>
    </section>
  )
}
