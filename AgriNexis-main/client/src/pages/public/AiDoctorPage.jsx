import { useCallback, useEffect, useState } from 'react'
import { AiDiagnosisStepsCard } from '@/components/ai-doctor/AiDiagnosisStepsCard'
import { AiDoctorPageHeader } from '@/components/ai-doctor/AiDoctorPageHeader'
import { PlantImageUploadCard } from '@/components/ai-doctor/PlantImageUploadCard'
import { RecentDiagnosesPanel } from '@/components/ai-doctor/RecentDiagnosesPanel'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { fetchDiagnosisHistory, predictPlantDisease } from '@/services/aiDoctorApi'

export function AiDoctorPage() {
  const [history, setHistory] = useState([])
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const loadHistory = useCallback(async () => {
    try {
      setHistory(await fetchDiagnosisHistory())
    } catch (historyError) {
      setError(historyError.message || 'Could not load diagnosis history.')
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  async function handleAnalyze({ image, plantName }) {
    setIsLoading(true)
    setError('')
    setResult(null)
    try {
      const prediction = await predictPlantDisease({ image, plantName })
      setResult(prediction)
      await loadHistory()
    } catch (analysisError) {
      setError(analysisError.message || 'The plant image could not be analyzed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <InteractiveCard panel hover="none" className="bg-white">
          <AiDoctorPageHeader />

          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
            <div className="space-y-6">
              <PlantImageUploadCard
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                result={result}
                error={error}
              />
              <AiDiagnosisStepsCard />
            </div>
            <RecentDiagnosesPanel diagnoses={history} />
          </div>
        </InteractiveCard>
      </div>
    </div>
  )
}
