import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { HELP_CARD } from '@/constants/faqContent'
import { ROUTES } from '@/constants/routes'
import { BTN_PRIMARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function HelpCard() {
  return (
    <InteractiveCard hover="action" className="p-6 text-center sm:p-8">
      <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
        {HELP_CARD.title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">
        {HELP_CARD.description}
      </p>
      <Link
        to={ROUTES.CONTACT}
        className={cn(BTN_PRIMARY, 'mt-6 inline-flex h-11 w-full px-6 text-sm uppercase tracking-wide sm:w-auto')}
      >
        {HELP_CARD.ctaLabel}
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </Link>
    </InteractiveCard>
  )
}
