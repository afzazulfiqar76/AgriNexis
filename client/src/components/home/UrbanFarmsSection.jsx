import { Plus } from 'lucide-react'
import { FarmCard } from '@/components/home/FarmCard'
import { Button } from '@/components/ui/Button'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { URBAN_FARMS } from '@/constants/urbanFarms'

export function UrbanFarmsSection() {
  return (
    <section
      aria-labelledby="urban-farms-heading"
      className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
    >
      <InteractiveCard panel hover="none" className="bg-white">
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
          <Button type="button" className="h-10 shrink-0 self-start px-4 sm:self-center">
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
            Add Farm
          </Button>
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
      </InteractiveCard>
    </section>
  )
}
