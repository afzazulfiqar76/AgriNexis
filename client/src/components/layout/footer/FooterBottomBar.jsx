import { FOOTER_CREDITS } from '@/constants/footer'

export function FooterBottomBar() {
  return (
    <section className="border-t border-slate-800">
      <section className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">{FOOTER_CREDITS.text}</p>
      </section>
    </section>
  )
}
