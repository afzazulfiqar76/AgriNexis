import { TrendingUp } from 'lucide-react'
import { ACTIVE_CHALLENGE } from '@/constants/activeChallenge'

export function ActiveChallengeCard() {
  const { title, description, savedLiters, targetLiters, progress } = ACTIVE_CHALLENGE

  return (
    <article className="rounded-2xl bg-primary p-6 text-white shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]">
      <header className="flex items-center gap-2">
        <TrendingUp className="size-5" strokeWidth={2} aria-hidden="true" />
        <h2 className="text-sm font-semibold">Active Challenge</h2>
      </header>

      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/90">{description}</p>

      <div
        className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/25"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Challenge progress"
      >
        <div
          className="h-full rounded-full bg-gray-900 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-medium text-white/90">
        {savedLiters}L / {targetLiters}L saved ({progress}%)
      </p>

      <button
        type="button"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Continue Challenge
      </button>
    </article>
  )
}
