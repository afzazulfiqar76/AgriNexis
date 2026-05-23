import { Link } from 'react-router-dom'

export function FooterLinkColumn({ title, links }) {
  return (
    <div className="flex min-w-[140px] flex-col gap-4">
      <h3 className="text-sm font-semibold text-emerald-400">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to.startsWith('#') ? (
              <a
                href={link.to}
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.to}
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
