import { BarChart3, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TRANSITION_UI } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function WelcomeBanner() {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-emerald-700 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] sm:p-8',
        TRANSITION_UI,
        'motion-safe:hover:shadow-lg',
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
          Welcome back, Admin!
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
          Your urban farms are thriving with 87% average health score
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="outline" className="h-11 px-5 text-sm">
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
            Add New Farm
          </Button>
          <Button type="button" variant="ghost-light" className="h-11 px-5 text-sm">
            <BarChart3 className="size-4" strokeWidth={2} aria-hidden="true" />
            View Analytics
          </Button>
        </div>
      </div>
    </article>
  )
}
