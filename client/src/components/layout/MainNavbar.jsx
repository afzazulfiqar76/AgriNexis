import { cn } from '@/utils/cn'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import { NavbarActions } from '@/components/layout/navbar/NavbarActions'
import { NavbarBrand } from '@/components/layout/navbar/NavbarBrand'
import { NavbarNavLinks } from '@/components/layout/navbar/NavbarNavLinks'
import { MobileNavMenu } from '@/components/layout/navbar/MobileNavMenu'

export function MainNavbar() {
  const scrolled = useNavbarScroll()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-base-100 transition-all duration-300',
        scrolled
          ? 'border-gray-200/60 bg-base-100/85 shadow-md backdrop-blur-md'
          : 'border-gray-200 shadow-sm',
      )}
    >
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
