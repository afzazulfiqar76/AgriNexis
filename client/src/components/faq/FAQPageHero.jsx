import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { FAQ_PAGE } from '@/constants/faqContent'
import { ROUTES } from '@/constants/routes'

export function FAQPageHero() {
  return (
    <header>
      <Link
        to={ROUTES.HOME}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 rounded-lg"
      >
        <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
        {FAQ_PAGE.backToHome}
      </Link>

      <div className="mt-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {FAQ_PAGE.label}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {FAQ_PAGE.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
          {FAQ_PAGE.subtitlePrefix}{' '}
          <Link
            to={ROUTES.CONTACT}
            className="font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
          >
            {FAQ_PAGE.contactLinkLabel}
          </Link>
          .
        </p>
      </div>
    </header>
  )
}
