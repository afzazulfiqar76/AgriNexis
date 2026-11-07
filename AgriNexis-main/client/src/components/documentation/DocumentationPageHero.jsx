import { DOCUMENTATION_PAGE } from '@/constants/documentationContent'

export function DocumentationPageHero() {
  return (
    <header className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {DOCUMENTATION_PAGE.label}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {DOCUMENTATION_PAGE.title}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
        {DOCUMENTATION_PAGE.subtitle}
      </p>
    </header>
  )
}
