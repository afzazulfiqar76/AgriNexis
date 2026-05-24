export const CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.05)]'

export const CARD_SHADOW_HOVER =
  'shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.07)]'

export const TRANSITION_UI =
  'transition-[color,background-color,border-color,box-shadow,filter] duration-200 ease-out motion-reduce:transition-none'

export const CARD_SURFACE = [
  'rounded-2xl border border-gray-100/90 bg-white/95 backdrop-blur-sm',
  CARD_SHADOW,
  TRANSITION_UI,
].join(' ')

export const CARD_HOVER_SUBTLE = [
  'motion-safe:hover:border-primary/25',
  'motion-safe:hover:bg-base-100/80',
  'motion-safe:hover:shadow-lg motion-safe:hover:shadow-black/[0.06]',
].join(' ')

export const CARD_HOVER_ACTION = [
  'motion-safe:hover:border-primary/30',
  'motion-safe:hover:bg-white',
  'motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/10',
  'motion-safe:hover:brightness-[1.01]',
].join(' ')

/** @deprecated Use CARD_HOVER_ACTION via InteractiveCard hover="action" */
export const CARD_INTERACTIVE = CARD_HOVER_ACTION

export const PANEL_SURFACE = [
  'overflow-hidden rounded-2xl border border-gray-100/90 bg-white/95 backdrop-blur-sm',
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
  'rounded-xl border border-gray-200/90 bg-white text-gray-900 shadow-sm',
  'hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md hover:shadow-black/[0.04]',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_GHOST_LIGHT = [
  BTN_BASE,
  'rounded-xl border border-white/40 bg-white/10 text-white backdrop-blur-sm',
  'hover:border-white/70 hover:bg-white/25 hover:text-white hover:shadow-sm',
  'focus-visible:ring-white/40',
].join(' ')

export const BTN_GRADIENT = [
  BTN_BASE,
  'rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-md shadow-purple-200/50',
  'hover:from-purple-700 hover:to-fuchsia-600 hover:text-white hover:shadow-lg hover:shadow-purple-300/30 hover:brightness-105',
  'focus-visible:ring-purple-300/40',
].join(' ')

export const BTN_OUTLINE_EMERALD = [
  BTN_BASE,
  'rounded-xl border border-emerald-200/90 bg-white text-emerald-700 shadow-sm',
  'hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-md hover:shadow-emerald-500/10',
  'focus-visible:ring-emerald-400/40',
].join(' ')

export const BTN_GHOST_ACCENT = [
  BTN_BASE,
  'rounded-lg text-sm font-medium text-orange-500',
  'hover:bg-orange-50/80 hover:text-orange-600',
  'focus-visible:ring-orange-300/40',
].join(' ')

export const BTN_GHOST_LINK = [
  BTN_BASE,
  'rounded-lg text-xs font-medium text-gray-600',
  'hover:bg-gray-50 hover:text-purple-600',
  'focus-visible:ring-purple-300/40',
].join(' ')

export const BTN_PRIMARY = [
  BTN_BASE,
  'rounded-xl border border-primary/20 bg-primary text-white shadow-sm shadow-primary/15',
  'hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 hover:brightness-105',
  'active:brightness-95',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_SECONDARY = [
  BTN_BASE,
  'rounded-xl border border-gray-200/90 bg-white text-sm font-medium text-gray-700 shadow-sm',
  'hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:shadow-black/[0.04]',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_GHOST = [
  BTN_BASE,
  'rounded-lg text-sm font-medium text-gray-600',
  'hover:bg-gray-100/90 hover:text-gray-900',
  'focus-visible:ring-primary/30',
].join(' ')

export const BTN_ICON = [
  'inline-flex items-center justify-center rounded-lg',
  TRANSITION_UI,
  'hover:bg-gray-100/90 hover:shadow-sm hover:shadow-black/[0.04]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
].join(' ')

export const NAV_ITEM = [
  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
  TRANSITION_UI,
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
].join(' ')

export const NAV_ITEM_ACTIVE =
  'bg-slate-900 text-white shadow-md shadow-black/10 ring-1 ring-slate-800/50'

export const NAV_ITEM_IDLE =
  'text-gray-600 hover:bg-gray-100/90 hover:text-gray-900 hover:shadow-sm hover:shadow-black/[0.03]'

export const PROGRESS_TRACK = 'h-2 overflow-hidden rounded-full'

export const PROGRESS_FILL =
  'h-full rounded-full transition-all duration-500 ease-out motion-safe:animate-progress-fill'

export const LINK_HOVER = 'transition-colors duration-200 ease-out hover:text-white'

export const FOOTER_HEADING =
  'text-xs font-bold uppercase tracking-widest text-emerald-400'

export const FOOTER_LINK = [
  'text-sm text-slate-400 transition-colors duration-200 ease-out',
  'hover:text-emerald-300/90',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer',
].join(' ')

export const FOOTER_TEXT = 'text-sm leading-relaxed text-slate-400/90'

export const FOOTER_SOCIAL = [
  'flex size-10 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 ring-1 ring-slate-700/50',
  TRANSITION_UI,
  'hover:bg-emerald-500/15 hover:text-emerald-400 hover:ring-emerald-500/20 hover:shadow-sm hover:shadow-emerald-500/10',
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
  'hover:bg-emerald-500/15 hover:text-emerald-400 hover:ring-1 hover:ring-emerald-500/10',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
].join(' ')

export const PROFILE_DROPDOWN_ITEM_DANGER = [
  PROFILE_DROPDOWN_ITEM,
  'hover:bg-red-500/15 hover:text-red-400 hover:ring-red-500/10',
].join(' ')

export const DROPDOWN_ITEM = [
  'transition-[color,background-color] duration-200 ease-out',
  'hover:bg-gray-50/90',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-inset',
].join(' ')
