import { Flame } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'

export function PostCard({ authorName, initials, timeAgo, content, likeCount }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar initials={initials} size="md" />
          <h3 className="text-sm font-bold text-gray-900">{authorName}</h3>
        </div>
        <time className="shrink-0 text-xs text-gray-400">{timeAgo}</time>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-700">{content}</p>

      <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30"
        >
          <Flame className="size-4" strokeWidth={2} aria-hidden="true" />
          {likeCount}
        </button>
        <button
          type="button"
          className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          Comment
        </button>
        <button
          type="button"
          className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          Share
        </button>
      </div>
    </article>
  )
}
