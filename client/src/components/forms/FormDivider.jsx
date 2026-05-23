import { memo } from 'react'

function FormDividerComponent({ label }) {
  return (
    <div className="relative flex items-center py-1">
      <div className="flex-1 border-t border-gray-200" aria-hidden="true" />
      <span className="px-4 text-xs font-medium tracking-wider text-gray-400 uppercase">
        {label}
      </span>
      <div className="flex-1 border-t border-gray-200" aria-hidden="true" />
    </div>
  )
}

export const FormDivider = memo(FormDividerComponent)
