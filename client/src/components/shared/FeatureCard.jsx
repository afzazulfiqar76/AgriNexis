import { memo } from 'react'

function FeatureCardComponent({ icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      {icon}
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
  )
}

export const FeatureCard = memo(FeatureCardComponent)
