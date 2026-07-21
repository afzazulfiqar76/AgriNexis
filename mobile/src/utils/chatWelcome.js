export const CHATBOT_NAME = 'AgriNexis Assistant'

export const MODEL_UNAVAILABLE_MESSAGE =
  'The model is currently unavailable. Please try again later.'

export const DEFAULT_WELCOME_LINE = `Welcome to ${CHATBOT_NAME}. How can I help you today?`

const LEGACY_WELCOME_PATTERNS = [
  /CoreForge/i,
  /Ask me anything about technology, programming/i,
  /I can help you understand AgriNexis/i,
  /learn about features like AI Plant Doctor/i,
  /I'm here to help you with programming/i,
  /navigate the website, and learn about features/i,
  /\/dashboard|\/ai-plant-doctor|\/ai-doctor|\/iot-sensors/i,
  /Here(?:'|’)s what I can help with/i,
  /Try asking about/i,
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
