import { Clock, Mail, MapPin } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  mail: Mail,
  mapPin: MapPin,
  clock: Clock,
}

export function SupportInfoCard({ label, value, href, icon }) {
  const Icon = ICON_MAP[icon] ?? Mail

  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-primary ring-1 ring-emerald-200/60">
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">{value}</p>
      </div>
    </>
  )

  return (
    <InteractiveCard
      as={href ? 'a' : 'article'}
      href={href}
      hover={href ? 'subtle' : 'none'}
      className={cn(
        'flex items-center gap-4 p-5',
        href && 'no-underline hover:text-gray-900',
      )}
    >
      {content}
    </InteractiveCard>
  )
}
