import { FOOTER_QUICK_LINKS, FOOTER_RESOURCES } from '@/constants/footer'
import { FooterBottomBar } from '@/components/layout/footer/FooterBottomBar'
import { FooterBrand } from '@/components/layout/footer/FooterBrand'
import { FooterContact } from '@/components/layout/footer/FooterContact'
import { FooterLinkColumn } from '@/components/layout/footer/FooterLinkColumn'

export function SiteFooter() {
  return (
    <footer data-site-footer className="relative overflow-hidden bg-footer text-slate-400">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-500/5 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-16">
          <FooterBrand className="sm:col-span-2 lg:col-span-1" />
          <FooterLinkColumn title={FOOTER_QUICK_LINKS.title} links={FOOTER_QUICK_LINKS.links} />
          <FooterLinkColumn title={FOOTER_RESOURCES.title} links={FOOTER_RESOURCES.links} />
          <FooterContact />
        </div>
      </div>

      <FooterBottomBar />
    </footer>
  )
}
