import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Leaf, ShieldCheck, Sprout, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { ROUTES } from '@/constants/routes'
import { fetchFarmAnalytics } from '@/services/farmsApi'

// Colours for the three health groups (same order as the API: excellent, good, low)
const HEALTH_BANDS = [
  { key: 'excellent', label: 'Excellent (80-100)', barClass: 'bg-emerald-500' },
  { key: 'good', label: 'Good (50-79)', barClass: 'bg-amber-400' },
  { key: 'needs_attention', label: 'Needs attention (0-49)', barClass: 'bg-red-500' },
]

function StatCard({ label, value, hint, icon: Icon, iconClassName }) {
  return (
    <InteractiveCard hover="none" className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        </div>
        <span
          className={`inline-flex size-10 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </InteractiveCard>
  )
}

function Panel({ title, subtitle, children }) {
  return (
    <InteractiveCard hover="none" className="p-5 sm:p-6">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </InteractiveCard>
  )
}

function FarmRow({ farm, rank }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-semibold text-gray-900">
          {rank ? <span className="mr-2 text-xs font-bold text-primary">#{rank}</span> : null}
          {farm.name}
        </p>
        <p className="truncate text-xs text-gray-500">
          {farm.farm_type_display}
          {farm.location ? ` · ${farm.location}` : ''} · {farm.plant_count} plants
        </p>
      </div>
      <p className="shrink-0 text-lg font-bold text-gray-900">{farm.health_score}%</p>
    </li>
  )
}

export function FarmAnalyticsPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  // Changing this number loads the report again (used by the Try again button)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetchFarmAnalytics()
      .then((report) => {
        if (cancelled) return
        setData(report)
        setError('')
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load analytics.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  function retry() {
    setLoading(true)
    setAttempt((n) => n + 1)
  }

  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Farm Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              How your farms are doing, based on your saved data
            </p>
          </div>
          <Link to={ROUTES.HOME} className="self-start sm:self-center">
            <Button type="button" variant="outline" className="h-10 px-4 text-sm">
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
              Back to Dashboard
            </Button>
          </Link>
        </header>

        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-md text-primary" />
          </div>
        )}

        {!loading && error && (
          <InteractiveCard hover="none" className="p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button type="button" onClick={retry} className="mt-4 h-10 px-4 text-sm">
              Try again
            </Button>
          </InteractiveCard>
        )}

        {!loading && !error && data && data.totals.total_farms === 0 && (
          <InteractiveCard hover="none" className="p-8 text-center">
            <h2 className="text-lg font-bold text-gray-900">No data to show yet</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add your first farm and its numbers will appear here.
            </p>
            <Link to={ROUTES.HOME} className="mt-4 inline-block">
              <Button type="button" className="h-10 px-4 text-sm">
                Go to Dashboard
              </Button>
            </Link>
          </InteractiveCard>
        )}

        {!loading && !error && data && data.totals.total_farms > 0 && (
          <Report data={data} />
        )}
      </div>
    </div>
  )
}

function Report({ data }) {
  const { totals, by_type, health_bands, top_farms, needs_attention, monthly } = data

  const maxTypeFarms = Math.max(...by_type.map((t) => t.farms), 1)
  const maxMonthly = Math.max(...monthly.map((m) => m.farms), 1)

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Farms"
          value={totals.total_farms}
          hint={`${totals.active_farms} active · ${totals.inactive_farms} inactive`}
          icon={Sprout}
          iconClassName="bg-primary text-white"
        />
        <StatCard
          label="Total Plants"
          value={totals.total_plants}
          hint="Across all your farms"
          icon={Leaf}
          iconClassName="bg-blue-500 text-white"
        />
        <StatCard
          label="Average Health"
          value={`${totals.average_health}%`}
          hint="Mean health score of all farms"
          icon={ShieldCheck}
          iconClassName="bg-purple-600 text-white"
        />
        <StatCard
          label="Needs Attention"
          value={health_bands.needs_attention}
          hint="Farms with health below 50"
          icon={TriangleAlert}
          iconClassName="bg-red-500 text-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel title="Health Breakdown" subtitle="How many farms fall in each health group">
          <div
            className="flex h-4 overflow-hidden rounded-full bg-gray-200"
            role="img"
            aria-label="Share of farms by health group"
          >
            {HEALTH_BANDS.map((band) => {
              const count = health_bands[band.key]
              if (count === 0) return null
              return (
                <div
                  key={band.key}
                  className={band.barClass}
                  style={{ width: `${(count / totals.total_farms) * 100}%` }}
                />
              )
            })}
          </div>
          <ul className="mt-4 space-y-2">
            {HEALTH_BANDS.map((band) => (
              <li key={band.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className={`size-3 rounded-full ${band.barClass}`} aria-hidden="true" />
                  {band.label}
                </span>
                <span className="font-semibold text-gray-900">
                  {health_bands[band.key]} {health_bands[band.key] === 1 ? 'farm' : 'farms'}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Farms by Type" subtitle="Number of farms and their average health">
          <ul className="space-y-4">
            {by_type.map((type) => (
              <li key={type.farm_type}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{type.label}</span>
                  <span className="text-gray-500">
                    {type.farms} {type.farms === 1 ? 'farm' : 'farms'} · {type.plants} plants
                    {type.farms > 0 ? ` · ${type.average_health}% health` : ''}
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(type.farms / maxTypeFarms) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Farms Added" subtitle="New farms per month, last 6 months">
        <div className="flex h-44 items-end gap-3 sm:gap-6">
          {monthly.map((month) => (
            <div key={month.month} className="flex h-full flex-1 flex-col justify-end">
              <span className="mb-1 text-center text-xs font-semibold text-gray-700">
                {month.farms}
              </span>
              <div
                className="w-full rounded-t-lg bg-primary/80"
                // Even a month with 0 farms gets a thin line so the chart does not look broken
                style={{ height: `${Math.max((month.farms / maxMonthly) * 100, 3)}%` }}
                title={`${month.label}: ${month.farms} farms`}
              />
              <span className="mt-2 text-center text-xs text-gray-500">{month.label}</span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel title="Top Farms" subtitle="Your healthiest farms">
          <ul className="space-y-3">
            {top_farms.map((farm, index) => (
              <FarmRow key={farm.id} farm={farm} rank={index + 1} />
            ))}
          </ul>
        </Panel>

        <Panel title="Needs Attention" subtitle="Farms with health score below 50">
          {needs_attention.length === 0 ? (
            <p className="text-sm text-emerald-700">
              Great news, none of your farms need urgent care.
            </p>
          ) : (
            <ul className="space-y-3">
              {needs_attention.map((farm) => (
                <FarmRow key={farm.id} farm={farm} />
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  )
}
