export function PlaceholderPage({ title, description }) {
  return (
    <section className="flex min-h-full flex-col items-center justify-center bg-base-200 px-4 py-16 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
        <p className="mt-3 text-base text-gray-600">{description}</p>
      </section>
    </section>
  )
}
