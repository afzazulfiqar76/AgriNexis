import { Link } from 'react-router-dom'
import { LINK_HOVER } from '@/constants/uiClasses'
import { cn } from '@/utils/cn'

const linkClassName = cn(
  'text-sm text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer',
  LINK_HOVER,
)

export function FooterLinkColumn({ title, links }) {
  return (
    <div className="flex min-w-[140px] flex-col gap-4">
      <h3 className="text-sm font-semibold text-emerald-400">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to.startsWith('#') ? (
              <a href={link.to} className={linkClassName}>
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className={linkClassName}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
