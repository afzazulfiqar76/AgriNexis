import {
  BrainCircuit,
  Clock,
  Droplets,
  TrendingUp,
} from 'lucide-react'
import { DROPDOWN_ITEM } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  brain: BrainCircuit,
  droplets: Droplets,
  trending: TrendingUp,
  clock: Clock,
}

const VARIANT_STYLES = {
  warning: {
    iconWrap: 'bg-orange-100 text-orange-500',
  },
  success: {
    iconWrap: 'bg-green-100 text-green-600',
  },
  info: {
    iconWrap: 'bg-sky-100 text-sky-500',
  },
}

export function NotificationItem({ notification, onMarkRead }) {
  const { id, title, description, timeAgo, variant, icon, read } = notification
  const Icon = ICON_MAP[icon] ?? BrainCircuit
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.info

  function handleMarkRead(event) {
    event.stopPropagation()
    if (!read) onMarkRead(id)
  }

  function handleRowClick() {
    if (!read) onMarkRead(id)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleRowClick()
        }
      }}
      className={cn(
        DROPDOWN_ITEM,
        'relative flex cursor-pointer gap-3 px-4 py-3',
        !read && 'bg-primary/[0.06]',
        !read && 'hover:bg-primary/[0.08]',
      )}
      aria-label={read ? `${title}, read` : `${title}, unread`}
    >
      {!read && (
        <span
          className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
          aria-hidden="true"
        />
      )}

      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl',
          styles.iconWrap,
        )}
      >
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 pr-16">
        <p
          className={cn(
            'text-sm leading-snug text-gray-900',
            !read ? 'font-semibold' : 'font-medium',
          )}
        >
          {title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{description}</p>
        <p className="mt-1 text-xs text-gray-400">{timeAgo}</p>
      </div>

      {!read && (
        <button
          type="button"
          onClick={handleMarkRead}
          className="absolute right-3 top-3 text-xs font-medium text-primary transition-colors hover:text-emerald-700"
        >
          Mark read
        </button>
      )}
    </article>
  )
}
