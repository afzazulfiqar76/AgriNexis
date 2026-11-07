import { TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PROGRESS_FILL, PROGRESS_TRACK, TRANSITION_UI } from '@/constants/uiClasses'
import { ACTIVE_CHALLENGE } from '@/constants/activeChallenge'
import { cn } from '@/utils/cn'

export function ActiveChallengeCard() {
  const { title, description, savedLiters, targetLiters, progress } = ACTIVE_CHALLENGE

  return (
    <article
      className={cn(
        'rounded-2xl bg-primary p-6 text-white shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]',
        TRANSITION_UI,
        'motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/25 motion-safe:hover:brightness-[1.02]',
      )}
    >
      <header className="flex items-center gap-2">
        <TrendingUp className="size-5" strokeWidth={2} aria-hidden="true" />
        <h2 className="text-sm font-semibold">Active Challenge</h2>
      </header>

      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/90">{description}</p>

      <div
        className={cn(PROGRESS_TRACK, 'mt-5 h-2.5 bg-white/25')}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Challenge progress"
      >
        <div className={cn(PROGRESS_FILL, 'bg-gray-900')} style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-2 text-sm font-medium text-white/90">
        {savedLiters}L / {targetLiters}L saved ({progress}%)
      </p>

      <Button type="button" variant="outline" className="mt-5 h-11 w-full text-sm">
        Continue Challenge
      </Button>
    </article>
  )
}
