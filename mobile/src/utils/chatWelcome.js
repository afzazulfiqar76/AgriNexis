export const CHATBOT_NAME = 'AgriNexis Assistant'

export const MODEL_UNAVAILABLE_MESSAGE =
  'The model is currently unavailable. Please try again later.'

export const DEFAULT_WELCOME_LINE = `Welcome to ${CHATBOT_NAME}. How can I help you today?`

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
