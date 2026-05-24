export const CARD_SHADOW =
  'shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]'

export const TRANSITION_UI =
  'transition-colors transition-shadow duration-200 ease-out motion-reduce:transition-none'

export const CARD_SURFACE = [
  'rounded-2xl border border-white/60 bg-white/90 backdrop-blur-sm',
  CARD_SHADOW,
  TRANSITION_UI,
].join(' ')

export const CARD_HOVER_SUBTLE = [
  'motion-safe:hover:border-primary/20 motion-safe:hover:shadow-md',
].join(' ')

export const CARD_HOVER_ACTION = [
  'motion-safe:hover:border-primary/25 motion-safe:hover:bg-white motion-safe:hover:shadow-md',
].join(' ')

/** @deprecated Use CARD_HOVER_ACTION via InteractiveCard hover="action" */
export const CARD_INTERACTIVE = CARD_HOVER_ACTION

export const PANEL_SURFACE = [
  'overflow-hidden rounded-2xl border border-gray-100/80 bg-white/95 backdrop-blur-sm',
  CARD_SHADOW,
  TRANSITION_UI,
].join(' ')

export const BTN_BASE = [
  'inline-flex items-center justify-center gap-2 font-semibold',
  TRANSITION_UI,
  'focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
].join(' ')

export const BTN_OUTLINE = [
  BTN_BASE,
  'rounded-xl border border-gray-200/80 bg-white text-gray-900 shadow-sm',
  'hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_GHOST_LIGHT = [
  BTN_BASE,
  'rounded-xl border border-white/40 bg-white/10 text-white backdrop-blur-sm',
  'hover:border-white/60 hover:bg-white/20 hover:text-white',
  'focus-visible:ring-white/40',
].join(' ')

export const BTN_GRADIENT = [
  BTN_BASE,
  'rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-md shadow-purple-200/60',
  'hover:from-purple-700 hover:to-fuchsia-600 hover:text-white hover:shadow-md',
  'focus-visible:ring-purple-300/40',
].join(' ')

export const BTN_OUTLINE_EMERALD = [
  BTN_BASE,
  'rounded-xl border border-emerald-200 bg-white text-emerald-700 shadow-sm',
  'hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800',
  'focus-visible:ring-emerald-400/40',
].join(' ')

export const BTN_GHOST_ACCENT = [
  BTN_BASE,
  'rounded-lg text-sm font-medium text-orange-500',
  'hover:text-orange-600',
  'focus-visible:ring-orange-300/40',
].join(' ')

export const BTN_GHOST_LINK = [
  BTN_BASE,
  'rounded-lg text-xs font-medium text-gray-600',
  'hover:text-purple-600',
  'focus-visible:ring-purple-300/40',
].join(' ')

export const BTN_PRIMARY = [
  BTN_BASE,
  'rounded-xl bg-primary text-white shadow-sm',
  'hover:bg-primary/90 hover:text-white hover:shadow-md hover:brightness-95',
  'active:brightness-90',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_SECONDARY = [
  BTN_BASE,
  'rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700',
  'hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_GHOST = [
  BTN_BASE,
  'rounded-lg text-sm font-medium text-gray-600',
  'hover:bg-gray-100/80 hover:text-gray-900',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_ICON = [
  'inline-flex items-center justify-center rounded-lg',
  TRANSITION_UI,
  'hover:bg-gray-100/80',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
].join(' ')

export const PROGRESS_TRACK = 'h-2 overflow-hidden rounded-full'

export const PROGRESS_FILL =
  'h-full rounded-full transition-all duration-500 ease-out motion-safe:animate-progress-fill'

export const LINK_HOVER = 'transition-colors duration-200 ease-out hover:text-white'

export const FOOTER_HEADING =
  'text-xs font-bold uppercase tracking-widest text-emerald-400'

export const FOOTER_LINK = [
  'text-sm text-slate-400 transition-colors duration-200 ease-out',
  'hover:text-white',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer',
].join(' ')

export const FOOTER_TEXT = 'text-sm leading-relaxed text-slate-400/90'

export const FOOTER_SOCIAL = [
  'flex size-10 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300',
  TRANSITION_UI,
  'hover:bg-emerald-500/10 hover:text-emerald-400',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer',
].join(' ')

export const FOOTER_DIVIDER = 'border-t border-slate-800/80'

export const PROFILE_DROPDOWN_PANEL = [
  'overflow-hidden rounded-2xl border border-slate-700/60 bg-footer/95 backdrop-blur-xl',
  'shadow-2xl shadow-black/20',
].join(' ')

export const PROFILE_DROPDOWN_ITEM = [
  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-300',
  TRANSITION_UI,
  'hover:bg-emerald-500/10 hover:text-emerald-400',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
].join(' ')

export const PROFILE_DROPDOWN_ITEM_DANGER = [
  PROFILE_DROPDOWN_ITEM,
  'hover:bg-red-500/10 hover:text-red-400',
].join(' ')
