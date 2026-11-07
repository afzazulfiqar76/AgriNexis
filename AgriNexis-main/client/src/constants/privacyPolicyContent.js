import { FOOTER_CONTACT } from '@/constants/footer'

export const PRIVACY_PAGE = {
  label: 'Legal',
  title: 'Privacy Policy',
  subtitle:
    'How AgriNexis collects, uses, and protects your information when you use our urban farming platform.',
  lastUpdated: 'May 24, 2026',
}

export const PRIVACY_SECTIONS = [
  {
    id: 'information-collection',
    title: 'Information Collection',
    paragraphs: [
      'AgriNexis collects information you provide directly and data generated through your use of the platform. This helps us deliver personalized farming recommendations, maintain your account, and improve our services.',
    ],
    bullets: [
      'Account registration details: name, email address, and password',
      'Farm and crop profiles: location, plot size, soil type, and irrigation setup',
      'Activity logs: planting dates, watering, fertilizing, and harvest records',
      'Plant images uploaded for AI diagnosis',
      'IoT sensor readings from connected devices (moisture, temperature, humidity, light)',
      'Usage data: pages visited, features used, and interaction timestamps',
    ],
  },
  {
    id: 'user-data',
    title: 'User Data',
    paragraphs: [
      'We store and process your data to operate core features such as farm management, AI Plant Doctor, smart irrigation, and community participation. Diagnosis history and sensor trends are linked to your account so you can review progress over time.',
      'Data is retained while your account is active and for a reasonable period afterward to comply with legal obligations and resolve disputes. You may request deletion of your account and associated data subject to applicable law.',
    ],
    bullets: [
      'Profile and preference data used to personalize recommendations',
      'Crop and farm records stored in secure cloud databases',
      'AI analysis results retained in your diagnosis history',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'AgriNexis uses cookies and similar technologies to keep you signed in, remember preferences, and understand how the platform is used. We do not use cookies for third-party advertising tracking.',
    ],
    bullets: [
      'Session cookies for authentication and security',
      'Preference cookies for UI settings where applicable',
      'Analytics cookies to measure feature usage and improve performance (aggregated where possible)',
      'You can control cookies through your browser settings; disabling essential cookies may limit functionality',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'We implement technical and organizational measures designed to protect your information against unauthorized access, alteration, disclosure, or destruction.',
    ],
    bullets: [
      'All data transmitted between your device and our servers uses HTTPS encryption',
      'Passwords are stored using industry-standard hashing (e.g., bcrypt) and are never stored in plain text',
      'Cloud data is encrypted at rest where supported by our infrastructure providers',
      'Access to production systems is restricted to authorized personnel',
      'We regularly review security practices as part of platform maintenance',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-party Services',
    paragraphs: [
      'AgriNexis integrates with trusted third-party services to provide authentication, hosting, weather data, and IoT connectivity. These providers process data according to their own privacy policies and our agreements with them.',
    ],
    bullets: [
      'Firebase (Google): authentication, database, and cloud storage',
      'OpenWeatherMap: weather forecasts and climate data for your farm location',
      'IoT gateways and device firmware partners for sensor data transmission',
      'We do not sell your personal information to third parties',
    ],
  },
  {
    id: 'user-rights',
    title: 'User Rights',
    paragraphs: [
      'Depending on your jurisdiction, you may have rights regarding your personal data. AgriNexis aims to honor reasonable requests in line with applicable privacy regulations.',
    ],
    bullets: [
      'Access: request a copy of personal data we hold about you',
      'Correction: update inaccurate profile or farm information in-app or by contact',
      'Deletion: request account and data deletion, subject to legal retention requirements',
      'Opt-out: decline non-essential communications or analytics where offered',
      'Portability: request export of your data in a machine-readable format where feasible',
    ],
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    paragraphs: [
      'For privacy-related questions, data requests, or concerns about this policy, contact the AgriNexis team using the details below.',
    ],
    bullets: [
      `Email: ${FOOTER_CONTACT.email}`,
      `Location: ${FOOTER_CONTACT.location}`,
      'We aim to respond to privacy inquiries within a reasonable business timeframe.',
    ],
  },
]
