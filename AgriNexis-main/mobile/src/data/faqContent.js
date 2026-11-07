export const FAQ_PAGE = {
  label: 'Help',
  title: 'Frequently Asked Questions',
  subtitlePrefix: 'Search by topic or keyword. Need more help?',
  contactLinkLabel: 'Contact Us',
  searchPlaceholder: 'Search questions and answers…',
  emptySearch: 'No questions match your search. Try a different keyword or category.',
  backToHome: 'Back to Home',
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'ai-doctor', label: 'AI Doctor' },
  { id: 'iot-sensors', label: 'IoT Sensors' },
  { id: 'community', label: 'Community' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'account', label: 'Account' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'support', label: 'Support' },
]

export const FAQ_CATEGORY_MAP = Object.fromEntries(
  FAQ_CATEGORIES.map((category) => [category.id, category.label]),
)

export const FAQ_ITEMS = [
  {
    id: 'general-what-is',
    category: 'general',
    question: 'What is AgriNexis?',
    answer:
      'AgriNexis is an AI-powered urban farming ecosystem that combines IoT sensors, plant health diagnostics, community challenges, and dashboard analytics to help you grow healthier crops in urban environments.',
  },
  {
    id: 'general-who-for',
    category: 'general',
    question: 'Who is AgriNexis designed for?',
    answer:
      'The platform is built for urban farmers, hobby growers, community gardens, and small-scale agricultural operators who want real-time insights, smart irrigation guidance, and collaborative learning tools in one place.',
  },
  {
    id: 'general-get-started',
    category: 'general',
    question: 'How do I get started?',
    answer:
      'Create a free account, set up your first farm from the dashboard, and connect your ESP32 sensors if available. You can explore the AI Plant Doctor and community features right away without hardware.',
  },
  {
    id: 'ai-doctor-how-works',
    category: 'ai-doctor',
    question: 'How does the AI Plant Doctor work?',
    answer:
      'Upload a clear photo of your plant leaves or stems. Our AI analyzes the image for signs of disease, pests, or nutrient stress and returns a diagnosis with treatment recommendations you can act on immediately.',
  },
  {
    id: 'ai-doctor-photo-tips',
    category: 'ai-doctor',
    question: 'What makes a good photo for diagnosis?',
    answer:
      'Use natural daylight, focus on affected areas, and avoid blurry or heavily shadowed shots. Include multiple angles if symptoms appear on different parts of the plant for more accurate results.',
  },
  {
    id: 'ai-doctor-accuracy',
    category: 'ai-doctor',
    question: 'How accurate are AI diagnoses?',
    answer:
      'Diagnoses are guidance tools based on visual patterns and agronomic models. For severe or unclear cases, combine AI results with local expert advice and monitor your plants over several days.',
  },
  {
    id: 'iot-sensors-supported',
    category: 'iot-sensors',
    question: 'Which sensors does AgriNexis support?',
    answer:
      'The IoT Sensors page is optimized for ESP32 devices with DHT11 modules reporting soil moisture, temperature, humidity, and light intensity. Additional sensor types may be added in future releases.',
  },
  {
    id: 'iot-sensors-live-data',
    category: 'iot-sensors',
    question: 'How often is sensor data updated?',
    answer:
      'Live data refreshes as your device sends readings to the platform. Typical setups report every few minutes; you can view current values and smart irrigation recommendations on the IoT Sensors dashboard.',
  },
  {
    id: 'iot-sensors-irrigation',
    category: 'iot-sensors',
    question: 'What is Smart Irrigation Recommendation?',
    answer:
      'Based on soil moisture, weather forecasts, and crop needs, AgriNexis suggests when and how much to water—including scheduled irrigation times and estimated water volume for your setup.',
  },
  {
    id: 'community-challenges',
    category: 'community',
    question: 'What are community challenges?',
    answer:
      'Challenges are time-bound goals—such as water conservation or harvest milestones—that let farmers compete on leaderboards, share progress, and learn sustainable practices together.',
  },
  {
    id: 'community-posts',
    category: 'community',
    question: 'Can I share tips and updates with other farmers?',
    answer:
      'Yes. The Community feed lets you post updates, comment on others’ progress, and discover ideas from urban farmers in your region and beyond.',
  },
  {
    id: 'community-leaderboard',
    category: 'community',
    question: 'How does the leaderboard work?',
    answer:
      'Points are earned through challenge participation, healthy farm metrics, and engagement. Rankings update as members complete activities and improve their farm health scores.',
  },
  {
    id: 'dashboard-stats',
    category: 'dashboard',
    question: 'What do the dashboard statistics show?',
    answer:
      'Your dashboard summarizes active farms, average health scores, alerts, and weather insights so you can spot issues early and track performance across all your urban farms.',
  },
  {
    id: 'dashboard-farms',
    category: 'dashboard',
    question: 'Can I manage multiple farms?',
    answer:
      'Yes. Add farms from the welcome banner or farms section, each with its own health metrics, sensor links, and alerts. Switch between farms to monitor them individually.',
  },
  {
    id: 'dashboard-alerts',
    category: 'dashboard',
    question: 'What are Smart Alerts?',
    answer:
      'Smart Alerts notify you about weather changes, sensor thresholds, and plant health risks so you can respond before small issues become crop losses.',
  },
  {
    id: 'account-sign-up',
    category: 'account',
    question: 'How do I create an account?',
    answer:
      'Click Sign Up from the navigation or auth pages, enter your details, and verify your email if required. You can also sign in with supported social providers where enabled.',
  },
  {
    id: 'account-password',
    category: 'account',
    question: 'I forgot my password. What should I do?',
    answer:
      'Use the password reset option on the Sign In page. If you still cannot access your account, contact our support team with the email address linked to your profile.',
  },
  {
    id: 'account-profile',
    category: 'account',
    question: 'How do I update my profile and role?',
    answer:
      'Profile settings let you change your display name, role label, and notification preferences. Some fields may be managed by your organization administrator.',
  },
  {
    id: 'privacy-data',
    category: 'privacy',
    question: 'What data does AgriNexis collect?',
    answer:
      'We collect account information, farm and sensor data you provide, and usage analytics to improve the platform. See our Privacy Policy for full details on categories, retention, and your rights.',
  },
  {
    id: 'privacy-sharing',
    category: 'privacy',
    question: 'Is my farm data shared with third parties?',
    answer:
      'We do not sell your personal data. Limited sharing may occur with service providers who help operate the platform, always under agreements that protect your information.',
  },
  {
    id: 'privacy-delete',
    category: 'privacy',
    question: 'Can I request deletion of my data?',
    answer:
      'Yes. Contact us through the Contact Us page or email support to request account deletion or data export. We will process requests in line with applicable privacy regulations.',
  },
  {
    id: 'support-contact',
    category: 'support',
    question: 'How do I contact support?',
    answer:
      'Visit the Contact Us page to send a message, or email info@agrinexis.com. We typically respond within one business day during Mon–Fri, 9:00 AM – 6:00 PM PKT.',
  },
  {
    id: 'support-docs',
    category: 'support',
    question: 'Where can I find product documentation?',
    answer:
      'The Documentation page in the footer Resources section covers platform overview, features, architecture, and getting started guides for web and mobile.',
  },
  {
    id: 'support-bugs',
    category: 'support',
    question: 'How do I report a bug or feature request?',
    answer:
      'Use the Contact Us form and select Technical Support or General Inquiry. Include steps to reproduce, screenshots if possible, and your browser or device details for faster resolution.',
  },
]

export const HELP_CARD = {
  title: 'Still Need Help?',
  description:
    'Our team can help with farms, sensors, AI diagnostics, and account questions.',
  ctaLabel: 'Contact Us',
}
