import { cn } from '@/utils/cn'

const VARIANTS = {
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  operational: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  online: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  read: 'bg-slate-100 text-slate-700 border-slate-200',
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  in_progress: 'bg-sky-100 text-sky-800 border-sky-200',
  scheduled: 'bg-sky-100 text-sky-800 border-sky-200',
  open: 'bg-orange-100 text-orange-800 border-orange-200',
  suspended: 'bg-red-100 text-red-800 border-red-200',
  hidden: 'bg-red-100 text-red-800 border-red-200',
  offline: 'bg-red-100 text-red-800 border-red-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

export function StatusBadge({ status, label, className }) {
  const key = String(status ?? '').toLowerCase().replace(/\s+/g, '_')
  const display = label ?? status

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize',
        VARIANTS[key] ?? 'bg-slate-100 text-slate-700 border-slate-200',
        className,
      )}
    >
      {display}
    </span>
  )
}
