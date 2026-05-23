export function AuthLayout({
  brandPanel,
  authPanel,
  authPanelLabel = 'Authentication',
}) {
  return (
    <main className="min-h-dvh bg-base-200 font-sans text-gray-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-16 lg:px-8 xl:gap-20">
        <section
          aria-label="About AgriNexis"
          className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:sticky lg:top-0 lg:h-dvh lg:px-0 lg:py-12"
        >
          {brandPanel}
        </section>
        <section
          aria-label={authPanelLabel}
          className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:min-h-dvh lg:px-0 lg:py-12"
        >
          {authPanel}
        </section>
      </div>
    </main>
  )
}
