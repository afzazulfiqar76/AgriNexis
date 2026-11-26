import { BarChart3, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { TRANSITION_UI } from '@/constants/uiClasses'
import { useAuth } from '@/contexts/AuthContext'
import { useFarms } from '@/contexts/FarmsContext'
import { cn } from '@/utils/cn'

/** One friendly line under the heading, based on the user's real farms */
function getSubtitle(summary) {
  if (!summary || summary.active_farms === 0) {
    return 'Add your first farm to start tracking its health.'
  }
  const health = summary.average_health
  const mood = health >= 80 ? 'thriving' : health >= 50 ? 'doing fine' : 'need some care'
  return `Your urban farms are ${mood} with ${health}% average health score`
}

export function WelcomeBanner() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { summary, openAdd } = useFarms()

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Farmer'

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-emerald-700 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] sm:p-8',
        TRANSITION_UI,
        'motion-safe:hover:shadow-lg motion-safe:hover:shadow-emerald-900/25 motion-safe:hover:brightness-[1.02]',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-emerald-800/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-24 size-40 rounded-full bg-emerald-900/20"
      />

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
          {getSubtitle(summary)}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={openAdd}
            className="h-11 px-5 text-sm"
          >
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
            Add New Farm
          </Button>
          <Button
            type="button"
            variant="ghost-light"
            onClick={() => navigate(ROUTES.ANALYTICS)}
            className="h-11 px-5 text-sm"
          >
            <BarChart3 className="size-4" strokeWidth={2} aria-hidden="true" />
            View Analytics
          </Button>
        </div>
      </div>
    </article>
  )
}
