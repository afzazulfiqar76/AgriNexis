import { PRIVACY_PAGE } from '@/constants/privacyPolicyContent'

export function PrivacyPolicyPageHero() {
  return (
    <header className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {PRIVACY_PAGE.label}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {PRIVACY_PAGE.title}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
        {PRIVACY_PAGE.subtitle}
      </p>
      <p className="mt-4 inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm">
        Last updated: {PRIVACY_PAGE.lastUpdated}
      </p>
    </header>
  )
}
