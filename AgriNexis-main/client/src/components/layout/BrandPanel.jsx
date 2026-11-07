import { BrandHeader } from '@/components/shared/BrandHeader'
import { FeatureCard } from '@/components/shared/FeatureCard'
import { FEATURES } from '@/constants/features'

export function BrandPanel() {
  return (
    <div className="flex flex-col gap-8">
      <BrandHeader />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          Welcome Back!
        </h1>
        <p className="max-w-md text-base leading-relaxed text-gray-600">
          Join the future of sustainable urban agriculture. Monitor your farms,
          get AI-powered insights, and connect with a community of passionate
          farmers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FEATURES.map(({ label, icon: Icon, iconBg, iconColor }) => (
          <FeatureCard
            key={label}
            label={label}
            icon={
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
              >
                <Icon className={`size-[18px] ${iconColor}`} strokeWidth={2} />
              </span>
            }
          />
        ))}
      </div>
    </div>
  )
}
