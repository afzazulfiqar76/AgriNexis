import { AUTH_MESSAGES } from '@/constants/authMessages'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MIN_PASSWORD_LENGTH = 8

function fail(message, id) {
  return { ok: false, message, id }
}

function pass() {
  return { ok: true }
}

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim())
}

export function validateSignIn({ email, password }) {
  const trimmedEmail = email?.trim() ?? ''
  const trimmedPassword = password ?? ''

  if (!trimmedEmail || !trimmedPassword) {
    return fail(AUTH_MESSAGES.warning.requiredFields, 'auth-signin-required')
  }

  if (!isValidEmail(trimmedEmail)) {
    return fail(AUTH_MESSAGES.warning.invalidEmail, 'auth-signin-email')
  }

  return pass()
}

export function validateSignUp({
  fullName,
  email,
  password,
  confirmPassword,
  agreedToTerms,
}) {
  const trimmedName = fullName?.trim() ?? ''
  const trimmedEmail = email?.trim() ?? ''

  if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
    return fail(AUTH_MESSAGES.warning.requiredFields, 'auth-signup-required')
  }

  if (!isValidEmail(trimmedEmail)) {
    return fail(AUTH_MESSAGES.warning.invalidEmail, 'auth-signup-email')
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return fail(AUTH_MESSAGES.warning.weakPassword, 'auth-signup-password')
  }

  if (password !== confirmPassword) {
    return fail(AUTH_MESSAGES.warning.passwordMismatch, 'auth-signup-mismatch')
  }

  if (!agreedToTerms) {
    return fail(AUTH_MESSAGES.warning.termsRequired, 'auth-signup-terms')
  }

  return pass()
}
