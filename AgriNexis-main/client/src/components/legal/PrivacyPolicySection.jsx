import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function PrivacyPolicySection({ section, index }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <InteractiveCard hover="none" className="bg-white p-6 sm:p-8">
        <h2 className="flex items-baseline gap-3 text-lg font-bold text-gray-900 sm:text-xl">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
            {index + 1}
          </span>
          {section.title}
        </h2>

        <div className="mt-4 space-y-4">
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
                className="flex gap-2 text-sm leading-relaxed text-gray-600 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-gray-400"
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </InteractiveCard>
    </section>
  )
}
