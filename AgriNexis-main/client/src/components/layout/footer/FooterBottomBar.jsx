import { FOOTER_CREDITS } from '@/constants/footer'
import { FOOTER_DIVIDER } from '@/constants/uiClasses'

export function FooterBottomBar() {
  return (
    <div className={FOOTER_DIVIDER}>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center lg:px-8">
        <p className="text-sm text-slate-500">{FOOTER_CREDITS.text}</p>
      </div>
    </div>
  )
}
