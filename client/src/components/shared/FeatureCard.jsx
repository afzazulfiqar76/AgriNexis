import { memo } from 'react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { cn } from '@/utils/cn'

function FeatureCardComponent({ icon, label, className }) {
  return (
    <InteractiveCard hover="action" className={cn('flex items-center gap-3 p-4', className)}>
      {icon}
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </InteractiveCard>
  )
}

export const FeatureCard = memo(FeatureCardComponent)
