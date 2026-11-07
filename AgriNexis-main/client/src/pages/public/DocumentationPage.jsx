import { useMemo, useState } from 'react'
import { DocumentationMobileNav } from '@/components/documentation/DocumentationMobileNav'
import { DocumentationPageHero } from '@/components/documentation/DocumentationPageHero'
import { DocumentationSearchBar } from '@/components/documentation/DocumentationSearchBar'
import { DocumentationSection } from '@/components/documentation/DocumentationSection'
import { DocumentationSidebar } from '@/components/documentation/DocumentationSidebar'
import {
  DOCUMENTATION_PAGE,
  DOCUMENTATION_SECTIONS,
} from '@/constants/documentationContent'
import { useScrollSpy } from '@/hooks/useScrollSpy'

function matchesQuery(section, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const haystack = [
    section.title,
    section.summary,
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []),
    ...(section.highlights?.map((h) => `${h.title} ${h.text}`) ?? []),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(q)
}

export function DocumentationPage() {
  const [query, setQuery] = useState('')

  const filteredSections = useMemo(
    () => DOCUMENTATION_SECTIONS.filter((section) => matchesQuery(section, query)),
    [query],
  )

  const sectionIds = useMemo(
    () => filteredSections.map((section) => section.id),
    [filteredSections],
  )

  const activeSectionId = useScrollSpy(sectionIds)

  function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <DocumentationPageHero />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DocumentationSidebar
                sections={filteredSections}
                activeSectionId={activeSectionId}
                onNavigate={scrollToSection}
              />
            </div>
          </aside>

          <main className="min-w-0 space-y-6">
            <DocumentationSearchBar
              value={query}
              onChange={setQuery}
              placeholder={DOCUMENTATION_PAGE.searchPlaceholder}
            />

            <DocumentationMobileNav
              sections={filteredSections}
              activeSectionId={activeSectionId}
              onNavigate={scrollToSection}
            />

            {filteredSections.length === 0 ? (
              <p className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center text-sm text-gray-500 shadow-sm">
                {DOCUMENTATION_PAGE.emptySearch}
              </p>
            ) : (
              <div className="space-y-6">
                {filteredSections.map((section) => (
                  <DocumentationSection key={section.id} section={section} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
