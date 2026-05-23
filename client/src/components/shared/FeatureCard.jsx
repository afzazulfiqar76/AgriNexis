import { memo } from 'react'
import { CARD_INTERACTIVE, CARD_SURFACE } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

function FeatureCardComponent({ icon, label }) {
  return (
    <div
      className={cn(
        CARD_SURFACE,
        CARD_INTERACTIVE,
        'flex items-center gap-3 p-4 md:hover:scale-[1.02]',
      )}
    >
      {icon}
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
  )
}

export const FeatureCard = memo(FeatureCardComponent)
