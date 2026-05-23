import { FOOTER_QUICK_LINKS, FOOTER_RESOURCES } from '@/constants/footer'
import { FooterBottomBar } from '@/components/layout/footer/FooterBottomBar'
import { FooterBrand } from '@/components/layout/footer/FooterBrand'
import { FooterContact } from '@/components/layout/footer/FooterContact'
import { FooterLinkColumn } from '@/components/layout/footer/FooterLinkColumn'

export function SiteFooter() {
  return (
    <footer className="bg-footer text-slate-400">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-10 md:flex-row md:flex-wrap md:justify-between lg:flex-nowrap lg:gap-8">
          <FooterBrand />
          <FooterLinkColumn title={FOOTER_QUICK_LINKS.title} links={FOOTER_QUICK_LINKS.links} />
          <FooterLinkColumn title={FOOTER_RESOURCES.title} links={FOOTER_RESOURCES.links} />
          <FooterContact />
        </section>
      </section>
      <FooterBottomBar />
    </footer>
  )
}
