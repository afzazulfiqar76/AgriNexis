import {
  CARD_HOVER_ACTION,
  CARD_HOVER_SUBTLE,
  CARD_SURFACE,
  PANEL_SURFACE,
} from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const HOVER_MAP = {
  none: '',
  subtle: CARD_HOVER_SUBTLE,
  action: CARD_HOVER_ACTION,
}

export function InteractiveCard({
  as: Component = 'article',
  hover = 'none',
  interactive,
  panel = false,
  className,
  children,
  ...props
}) {
  const resolvedHover =
    interactive === true ? 'action' : interactive === false ? 'none' : hover

  return (
    <Component
      className={cn(
        panel ? PANEL_SURFACE : CARD_SURFACE,
        HOVER_MAP[resolvedHover],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
