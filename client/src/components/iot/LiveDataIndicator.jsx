import { Activity } from 'lucide-react'

export function LiveDataIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <Activity
        className="size-3.5 text-emerald-500"
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <span className="font-medium text-gray-500">Live data</span>
    </div>
  )
}
