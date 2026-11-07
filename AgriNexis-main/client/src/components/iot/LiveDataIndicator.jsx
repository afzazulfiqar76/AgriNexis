import { Activity } from 'lucide-react'

export function LiveDataIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="relative flex size-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <Activity
        className="size-3.5 text-emerald-500"
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <span className="font-medium text-gray-500">Live data</span>
    </div>
  )
}
