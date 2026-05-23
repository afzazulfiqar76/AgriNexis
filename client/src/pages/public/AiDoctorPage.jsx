import { AiDiagnosisStepsCard } from '@/components/ai-doctor/AiDiagnosisStepsCard'
import { AiDoctorPageHeader } from '@/components/ai-doctor/AiDoctorPageHeader'
import { PlantImageUploadCard } from '@/components/ai-doctor/PlantImageUploadCard'
import { RecentDiagnosesPanel } from '@/components/ai-doctor/RecentDiagnosesPanel'

export function AiDoctorPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
          <AiDoctorPageHeader />

          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
            <div className="space-y-6">
              <PlantImageUploadCard />
              <AiDiagnosisStepsCard />
            </div>
            <RecentDiagnosesPanel />
          </div>
        </article>
      </div>
    </div>
  )
}
