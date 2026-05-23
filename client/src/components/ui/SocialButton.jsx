import { memo } from 'react'

function SocialButtonComponent({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {icon}
      {label}
    </button>
  )
}

export const SocialButton = memo(SocialButtonComponent)
