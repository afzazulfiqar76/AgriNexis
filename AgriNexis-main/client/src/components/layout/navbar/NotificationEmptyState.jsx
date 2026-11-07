import { BellOff } from 'lucide-react'

export function NotificationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        <BellOff className="size-6" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="mt-4 text-sm font-semibold text-gray-900">You&apos;re all caught up</p>
      <p className="mt-1 text-xs text-gray-500">No new notifications right now</p>
    </div>
  )
}
