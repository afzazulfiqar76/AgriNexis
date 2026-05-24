import { AiDiagnosisStepsCard } from '@/components/ai-doctor/AiDiagnosisStepsCard'
import { AiDoctorPageHeader } from '@/components/ai-doctor/AiDoctorPageHeader'
import { PlantImageUploadCard } from '@/components/ai-doctor/PlantImageUploadCard'
import { RecentDiagnosesPanel } from '@/components/ai-doctor/RecentDiagnosesPanel'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export function AiDoctorPage() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <InteractiveCard panel hover="none" className="bg-white">
          <AiDoctorPageHeader />

          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
            <div className="space-y-6">
              <PlantImageUploadCard />
              <AiDiagnosisStepsCard />
            </div>
            <RecentDiagnosesPanel />
          </div>
        </InteractiveCard>
      </div>
    </div>
  )
}
