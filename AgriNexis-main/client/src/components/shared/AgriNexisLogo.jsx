import { memo } from 'react'
import { Sprout, Zap } from 'lucide-react'

function AgriNexisLogoComponent() {
  return (
    <div className="relative size-12 shrink-0">
      <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
        <Sprout className="size-6 text-white" strokeWidth={2.25} aria-hidden="true" />
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 flex size-[18px] items-center justify-center rounded-full bg-orange-400 ring-2 ring-base-200">
        <Zap className="size-2.5 fill-white text-white" aria-hidden="true" />
      </span>
    </div>
  )
}

export const AgriNexisLogo = memo(AgriNexisLogoComponent)
