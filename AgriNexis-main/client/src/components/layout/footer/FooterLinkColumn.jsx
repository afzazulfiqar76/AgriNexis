import { Link } from 'react-router-dom'
import { FooterColumn } from '@/components/layout/footer/FooterColumn'
import { FOOTER_LINK } from '@/constants/uiClasses'

export function FooterLinkColumn({ title, links }) {
  return (
    <FooterColumn title={title}>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.to.startsWith('#') ? (
              <a href={link.to} className={FOOTER_LINK}>
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className={FOOTER_LINK}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </FooterColumn>
  )
}
