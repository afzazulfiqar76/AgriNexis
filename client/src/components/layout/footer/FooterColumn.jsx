import { FOOTER_HEADING } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function FooterColumn({ title, children, className }) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {title && <h3 className={FOOTER_HEADING}>{title}</h3>}
      {children}
    </div>
  )
}
