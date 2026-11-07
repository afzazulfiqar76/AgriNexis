import { cn } from '@/utils/cn'

export function PrivacyPolicyTableOfContents({ sections }) {
  return (
    <nav
      aria-label="Privacy policy sections"
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <h2 className="text-sm font-bold text-gray-900">On this page</h2>
      <ol className="mt-3 space-y-2">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                'text-sm text-gray-600 transition-colors duration-300 hover:text-primary',
              )}
            >
              {index + 1}. {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
