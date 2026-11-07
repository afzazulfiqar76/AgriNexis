import { BTN_SECONDARY } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

export function TablePagination({ page, totalPages, totalCount, pageSize, onPageChange }) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalCount)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        Showing {start}–{end} of {totalCount}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={cn(BTN_SECONDARY, 'h-9 px-4 text-sm disabled:opacity-40')}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={cn(BTN_SECONDARY, 'h-9 px-4 text-sm disabled:opacity-40')}
        >
          Next
        </button>
      </div>
    </div>
  )
}
