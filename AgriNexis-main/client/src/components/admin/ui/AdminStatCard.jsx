import {
  BarChart3,
  BrainCircuit,
  Gauge,
  Sprout,
  Users,
  UsersRound,
} from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  users: Users,
  sprout: Sprout,
  brain: BrainCircuit,
  gauge: Gauge,
  usersRound: UsersRound,
  chart: BarChart3,
}

export function AdminStatCard({ label, value, trend, icon, iconClassName }) {
  const Icon = ICON_MAP[icon] ?? Users

  return (
    <InteractiveCard hover="none" className="relative p-5">
      <span
        className={cn(
          'absolute right-5 top-5 flex size-10 items-center justify-center rounded-xl',
          iconClassName,
        )}
      >
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      {trend && <p className="mt-1 text-xs font-medium text-primary">{trend}</p>}
    </InteractiveCard>
  )
}
