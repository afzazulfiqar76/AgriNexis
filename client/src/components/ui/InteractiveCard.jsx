import { CARD_INTERACTIVE, CARD_SURFACE, PANEL_SURFACE } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function InteractiveCard({
  as: Component = 'article',
  interactive = true,
  panel = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        panel ? PANEL_SURFACE : CARD_SURFACE,
        interactive && CARD_INTERACTIVE,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
