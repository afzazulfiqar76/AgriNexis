import {
  BTN_GHOST,
  BTN_GHOST_ACCENT,
  BTN_GHOST_LIGHT,
  BTN_GHOST_LINK,
  BTN_GRADIENT,
  BTN_ICON,
  BTN_OUTLINE,
  BTN_OUTLINE_EMERALD,
  BTN_PRIMARY,
  BTN_SECONDARY,
} from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const VARIANTS = {
  primary: BTN_PRIMARY,
  secondary: BTN_SECONDARY,
  outline: BTN_OUTLINE,
  'outline-emerald': BTN_OUTLINE_EMERALD,
  ghost: BTN_GHOST,
  'ghost-light': BTN_GHOST_LIGHT,
  'ghost-accent': BTN_GHOST_ACCENT,
  'ghost-link': BTN_GHOST_LINK,
  gradient: BTN_GRADIENT,
  icon: BTN_ICON,
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  children,
  ...props
}) {
  return (
    <button type={type} className={cn(VARIANTS[variant], className)} {...props}>
      {children}
    </button>
  )
}
