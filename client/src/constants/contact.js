import { FOOTER_CONTACT } from '@/constants/footer'

export const CONTACT_PAGE = {
  label: 'Contact',
  title: 'Contact Us',
  subtitle:
    'Questions about your farms, IoT sensors, or platform support? Send us a message and our team will reply as soon as possible.',
  formTitle: 'Send a Message',
  formHelper:
    'We typically reply within one business day. All fields marked with * are required.',
  infoPanelTitle: 'Support Center',
  infoPanelSubtitle: 'How to reach us',
}

export const INQUIRY_TYPES = [
  { value: '', label: 'Select inquiry type' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'iot', label: 'IoT & Sensors' },
  { value: 'community', label: 'Community & Challenges' },
  { value: 'partnership', label: 'Partnership & Collaboration' },
]

export const SUPPORT_INFO_CARDS = [
  {
    id: 'email',
    label: 'Email',
    value: FOOTER_CONTACT.email,
    href: `mailto:${FOOTER_CONTACT.email}`,
    icon: 'mail',
  },
  {
    id: 'location',
    label: 'Location',
    value: FOOTER_CONTACT.location,
    icon: 'mapPin',
  },
  {
    id: 'hours',
    label: 'Working Hours',
    value: 'Mon–Fri · 9:00 AM – 6:00 PM PKT',
    icon: 'clock',
  },
]
