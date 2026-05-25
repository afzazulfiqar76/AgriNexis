export const FAQ_PAGE = {
  label: 'Help',
  title: 'Frequently Asked Questions',
  subtitle: 'Search by topic or keyword. Need more help? Contact us.',
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'ai-doctor', label: 'AI Doctor' },
  { id: 'iot-sensors', label: 'IoT' },
  { id: 'community', label: 'Community' },
]

export const FAQ_ITEMS = [
  {
    id: 'general-what-is',
    category: 'general',
    question: 'What is AgriNexis?',
    answer:
      'AgriNexis is an AI-powered urban farming ecosystem that combines IoT sensors, plant health diagnostics, community challenges, and dashboard analytics.',
  },
  {
    id: 'general-get-started',
    category: 'general',
    question: 'How do I get started?',
    answer:
      'Create a free account, set up your first farm from the dashboard, and connect ESP32 sensors if available.',
  },
  {
    id: 'ai-doctor-how-works',
    category: 'ai-doctor',
    question: 'How does AI Plant Doctor work?',
    answer: 'Upload a clear photo of affected leaves; our model suggests diseases and treatment steps.',
  },
  {
    id: 'iot-connect',
    category: 'iot-sensors',
    question: 'How do I connect IoT sensors?',
    answer: 'Pair ESP32 devices through the IoT Sensors page and assign them to a farm plot.',
  },
  {
    id: 'community-challenges',
    category: 'community',
    question: 'What are community challenges?',
    answer: 'Timed growing goals where farmers earn points and climb the leaderboard.',
  },
]
