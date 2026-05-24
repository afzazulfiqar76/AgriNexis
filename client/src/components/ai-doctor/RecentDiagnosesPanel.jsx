import { DiagnosisCard } from '@/components/ai-doctor/DiagnosisCard'
import { RECENT_DIAGNOSES } from '@/constants/recentDiagnoses'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function RecentDiagnosesPanel() {
  return (
    <InteractiveCard
      as="section"
      panel
      hover="none"
      className="rounded-xl border-gray-100/60 bg-gray-50/40 p-5 shadow-none"
      aria-labelledby="recent-diagnoses-heading"
    >
      <header className="mb-5 flex items-center justify-between gap-3">
        <h2 id="recent-diagnoses-heading" className="text-lg font-bold text-gray-900">
          Recent Diagnoses
        </h2>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {RECENT_DIAGNOSES.length} Total
        </span>
      </header>

      <div className="space-y-4">
        {RECENT_DIAGNOSES.map((diagnosis) => (
          <DiagnosisCard
            key={diagnosis.id}
            plantName={diagnosis.plantName}
            condition={diagnosis.condition}
            status={diagnosis.status}
            date={diagnosis.date}
            iconClassName={diagnosis.iconClassName}
          />
        ))}
      </div>
    </InteractiveCard>
  )
}
