import { Flame } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function PostCard({ authorName, initials, timeAgo, content, likeCount }) {
  return (
    <InteractiveCard hover="none" className="bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar initials={initials} size="md" />
          <h3 className="text-sm font-bold text-gray-900">{authorName}</h3>
        </div>
        <time className="shrink-0 text-xs text-gray-400">{timeAgo}</time>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-700">{content}</p>

      <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
        <Button variant="ghost-accent" className="h-auto gap-1.5 px-0 py-0">
          <Flame className="size-4" strokeWidth={2} aria-hidden="true" />
          {likeCount}
        </Button>
        <Button variant="ghost" className="h-auto px-0 py-0 text-sm">
          Comment
        </Button>
        <Button variant="ghost" className="h-auto px-0 py-0 text-sm">
          Share
        </Button>
      </div>
    </InteractiveCard>
  )
}
