import { AgriNexisLogo } from '@/components/shared/AgriNexisLogo'

export function BrandHeader() {
  return (
    <div className="flex items-center gap-3">
      <AgriNexisLogo />
      <div>
        <p className="text-xl font-bold text-emerald-900">AgriNexis</p>
        <p className="text-sm text-gray-500">AI-Powered Urban Farming Ecosystem</p>
      </div>
    </div>
  )
}
