import { NavbarActions } from '@/components/layout/navbar/NavbarActions'
import { NavbarBrand } from '@/components/layout/navbar/NavbarBrand'
import { NavbarNavLinks } from '@/components/layout/navbar/NavbarNavLinks'
import { MobileNavMenu } from '@/components/layout/navbar/MobileNavMenu'

export function MainNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-base-100 shadow-sm">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
          <MobileNavMenu />
          <NavbarBrand />
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <NavbarNavLinks />
        </div>

        <div className="flex shrink-0 items-center">
          <NavbarActions />
        </div>
      </div>
    </header>
  )
}
