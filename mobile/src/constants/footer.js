import { ROUTES } from './routes'

export const FOOTER_BRAND = {
  description:
    'AI-Powered Urban Farming Ecosystem empowering sustainable agriculture through IoT, Blockchain, and Community collaboration.',
}

export const FOOTER_QUICK_LINKS = {
  title: 'Quick Links',
  links: [
    { label: 'Dashboard', route: ROUTES.HOME },
    { label: 'AI Plant Doctor', route: ROUTES.AI_DOCTOR },
    { label: 'IoT Sensors', route: ROUTES.IOT_SENSORS },
    { label: 'Community', route: ROUTES.COMMUNITY },
  ],
}

export const FOOTER_RESOURCES = {
  title: 'Resources',
  links: [
    { label: 'Documentation', route: ROUTES.DOCUMENTATION },
    { label: 'FAQs', route: ROUTES.FAQS },
    { label: 'Contact Us', route: ROUTES.CONTACT },
    { label: 'Privacy Policy', route: ROUTES.PRIVACY_POLICY },
  ],
}

export const FOOTER_CONTACT = {
  title: 'Contact Us',
  email: 'info@agrinexis.com',
  location: 'Lahore, Pakistan',
}

export const FOOTER_CREDITS = {
  text: '© 2026 AgriNexis. All rights reserved.',
}
