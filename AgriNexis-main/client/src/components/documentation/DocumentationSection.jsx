import {
  BrainCircuit,
  Droplets,
  Gauge,
  Layers,
  LayoutDashboard,
  Rocket,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react'
import { DocumentationHighlight } from '@/components/documentation/DocumentationHighlight'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

const ICON_MAP = {
  sprout: Sprout,
  sparkles: Sparkles,
  brain: BrainCircuit,
  gauge: Gauge,
  users: Users,
  droplets: Droplets,
  layout: LayoutDashboard,
  layers: Layers,
  rocket: Rocket,
}

export function DocumentationSection({ section }) {
  const Icon = ICON_MAP[section.icon] ?? Sprout

  return (
    <section id={section.id} className="scroll-mt-24">
      <InteractiveCard hover="none" className="overflow-hidden bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {section.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{section.summary}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {section.bullets?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {section.bullets.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-gray-600 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary"
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {section.highlights?.map((highlight) => (
          <DocumentationHighlight
            key={highlight.title ?? highlight.text}
            title={highlight.title}
            text={highlight.text}
          />
        ))}
      </InteractiveCard>
    </section>
  )
}
