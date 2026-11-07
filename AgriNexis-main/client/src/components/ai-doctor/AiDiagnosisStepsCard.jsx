import { BrainCircuit } from 'lucide-react'
import { AI_DIAGNOSIS_STEPS } from '@/constants/aiDiagnosisSteps'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function AiDiagnosisStepsCard() {
  return (
    <InteractiveCard
      hover="none"
      className="border-violet-100 bg-violet-50 p-6"
    >
      <header className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
          <BrainCircuit className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="text-base font-bold text-gray-900">How AI Diagnosis Works</h2>
      </header>

      <ol className="mt-5 space-y-5">
        {AI_DIAGNOSIS_STEPS.map(({ id, step, title, description }) => (
          <li key={id} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
              {step}
            </span>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </InteractiveCard>
  )
}
