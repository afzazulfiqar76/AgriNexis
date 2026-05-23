import { cn } from '@/utils/cn'

const sizeClasses = {
  sm: 'size-8 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-11 text-base',
}

export function Avatar({ initials, size = 'md', className, ...props }) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  )
}
