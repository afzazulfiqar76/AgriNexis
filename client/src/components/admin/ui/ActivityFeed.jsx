import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function ActivityFeed({ items, title = 'Recent Activity' }) {
  return (
    <InteractiveCard hover="none" className="p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
          >
            <p className="text-sm text-gray-700">{item.message}</p>
            <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </InteractiveCard>
  )
}
