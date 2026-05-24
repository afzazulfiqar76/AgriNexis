import { CONTACT_PAGE } from '@/constants/contact'

export function ContactPageHero() {
  return (
    <header className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {CONTACT_PAGE.label}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {CONTACT_PAGE.title}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
        {CONTACT_PAGE.subtitle}
      </p>
    </header>
  )
}
