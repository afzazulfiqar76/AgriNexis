import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavbarNavLinks } from '@/components/layout/navbar/NavbarNavLinks'

export function MobileNavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <X className="size-5" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Menu className="size-5" strokeWidth={2} aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-menu"
          className="absolute inset-x-0 top-16 z-50 border-b border-gray-200 bg-base-100 px-4 py-4 shadow-md"
        >
          <NavbarNavLinks onLinkClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
