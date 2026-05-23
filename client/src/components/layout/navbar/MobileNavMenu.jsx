import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BTN_ICON } from '@/constants/uiClasses'
import { NavbarNavLinks } from '@/components/layout/navbar/NavbarNavLinks'
import { cn } from '@/utils/cn'

export function MobileNavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={cn(BTN_ICON, 'size-10 text-gray-700')}
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
