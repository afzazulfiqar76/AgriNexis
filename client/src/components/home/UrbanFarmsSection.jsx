import { Plus } from 'lucide-react'
import { FarmCard } from '@/components/home/FarmCard'
import { URBAN_FARMS } from '@/constants/urbanFarms'

export function UrbanFarmsSection() {
  return (
    <section
      aria-labelledby="urban-farms-heading"
      className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
    >
      <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
        <header className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2
              id="urban-farms-heading"
              className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
            >
              My Urban Farms
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor your farming plots
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:self-center"
          >
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
            Add Farm
          </button>
        </header>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
          {URBAN_FARMS.map((farm) => (
            <FarmCard
              key={farm.id}
              name={farm.name}
              type={farm.type}
              location={farm.location}
              plantCount={farm.plantCount}
              healthScore={farm.healthScore}
              accentClassName={farm.accentClassName}
            />
          ))}
        </div>
      </article>
    </section>
  )
}
