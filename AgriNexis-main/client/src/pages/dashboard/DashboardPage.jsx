import { Link } from 'react-router-dom'
import { BrainCircuit, Gauge, UsersRound } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/utils/cn'

const QUICK_LINKS = [
  {
    title: 'AI Doctor',
    description: 'Diagnose plant health with AI guidance',
    to: ROUTES.AI_DOCTOR,
    icon: BrainCircuit,
    iconClassName: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'IoT Sensors',
    description: 'Monitor soil moisture and environmental data',
    to: ROUTES.IOT_SENSORS,
    icon: Gauge,
    iconClassName: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Community',
    description: 'Connect with urban farmers and share insights',
    to: ROUTES.COMMUNITY,
    icon: UsersRound,
    iconClassName: 'bg-sky-100 text-sky-700',
  },
]

export function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const profile = user

  return (
    <main className="min-h-dvh bg-base-200 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Farmer Dashboard
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile.name?.split(' ')[0] ?? 'Farmer'}
          </h1>
          <p className="text-gray-600">
            {profile.roleLabel ?? profile.role} — manage your urban farm from one place.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.to} to={link.to} className="block">
                <InteractiveCard hover="action" className="h-full p-5 sm:p-6">
                  <span
                    className={cn(
                      'mb-4 inline-flex size-10 items-center justify-center rounded-xl',
                      link.iconClassName,
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold text-gray-900">{link.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{link.description}</p>
                </InteractiveCard>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
