import { BrainCircuit } from 'lucide-react'

export function AiDoctorPageHeader() {
  return (
    <header className="bg-gradient-to-b from-violet-100/70 via-violet-50/50 to-white px-6 pb-2 pt-6">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
          <BrainCircuit className="size-6" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            AI Plant Doctor
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Upload plant photos for instant disease detection and AI-powered treatment
            recommendations.
          </p>
        </div>
      </div>
    </header>
  )
}
