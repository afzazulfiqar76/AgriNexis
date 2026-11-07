import { GitHubIcon } from '@/components/ui/icons/GitHubIcon'
import { LinkedInIcon } from '@/components/ui/icons/LinkedInIcon'
import { TwitterIcon } from '@/components/ui/icons/TwitterIcon'
import { ROUTES } from '@/constants/routes'

export const FOOTER_BRAND = {
  description:
    'AI-Powered Urban Farming Ecosystem empowering sustainable agriculture through IoT, Blockchain, and Community collaboration.',
}

export const FOOTER_QUICK_LINKS = {
  title: 'Quick Links',
  links: [
    { label: 'Dashboard', to: ROUTES.HOME },
    { label: 'AI Plant Doctor', to: ROUTES.AI_DOCTOR },
    { label: 'IoT Sensors', to: ROUTES.IOT_SENSORS },
    { label: 'Community', to: ROUTES.COMMUNITY },
  ],
}

export const FOOTER_RESOURCES = {
  title: 'Resources',
  links: [
    { label: 'Documentation', to: ROUTES.DOCUMENTATION },
    { label: 'FAQs', to: ROUTES.FAQS },
    { label: 'Contact Us', to: ROUTES.CONTACT },
    { label: 'Privacy Policy', to: ROUTES.PRIVACY_POLICY },
  ],
}

export const FOOTER_CONTACT = {
  title: 'Contact Us',
  email: 'info@agrinexis.com',
  location: 'Lahore, Pakistan',
}

export const FOOTER_SOCIAL_LINKS = [
  { label: 'Twitter', href: '#', icon: TwitterIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { label: 'GitHub', href: '#', icon: GitHubIcon },
]

export const FOOTER_CREDITS = {
  text: '© 2026 AgriNexis. All rights reserved.',
}
