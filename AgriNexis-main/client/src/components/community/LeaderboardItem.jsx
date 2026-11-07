import { Trophy } from 'lucide-react'
import { cn } from '@/utils/cn'
import { TRANSITION_UI } from '@/constants/uiClasses'

export function LeaderboardItem({ name, score, badgeClassName, isCurrentUser }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5',
        TRANSITION_UI,
        isCurrentUser
          ? 'border-2 border-primary bg-primary/5 shadow-sm shadow-primary/10'
          : 'border border-transparent hover:border-gray-200 hover:bg-gray-50/90 hover:shadow-sm hover:shadow-black/[0.03]',
      )}
    >
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-lg',
          badgeClassName,
        )}
      >
        <Trophy className="size-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">{name}</span>
      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-sm font-bold text-gray-900">
        {score}
      </span>
    </div>
  )
}
