export const CHATBOT_NAME = 'AgriNexis Assistant'

export const MODEL_UNAVAILABLE_MESSAGE =
  'The model is currently unavailable. Please try again later.'

export const DEFAULT_WELCOME_LINE = `Welcome to ${CHATBOT_NAME}. I can help you understand AgriNexis, navigate the website, and learn about features like AI Plant Doctor, IoT Sensors, Community, and more.`

const LEGACY_WELCOME_PATTERNS = [
  /CoreForge/i,
  /Ask me anything about technology, programming/i,
  /Welcome to AgriNexis\. How can I help/i,
  /I'm here to help you with programming/i,
]

/** True if stored text is an outdated bot welcome / self-intro. */
export function isLegacyWelcomeContent(content) {
  const text = String(content ?? '').trim()
  if (!text) return false
  return LEGACY_WELCOME_PATTERNS.some((re) => re.test(text))
}

/**
 * Build a short welcome message from auth state.
 * @param {{ user?: object | null, isAuthenticated?: boolean }} options
 */
export function getChatWelcomeContent({ user = null, isAuthenticated = false } = {}) {
  if (isAuthenticated && user) {
    const fullName = String(user.name ?? '').trim()
    const firstName = fullName.split(/\s+/).filter(Boolean)[0] || ''
    if (firstName) {
      return `Hi ${firstName}! 👋\n\n${DEFAULT_WELCOME_LINE}`
    }
  }
  return `Hi there! 👋\n\n${DEFAULT_WELCOME_LINE}`
}
