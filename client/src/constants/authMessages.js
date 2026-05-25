import { USER_ROLES } from '@/constants/auth'

export const AUTH_MESSAGES = {
  success: {
    register: 'Account created successfully.',
    logout: 'Signed out successfully.',
    changesSaved: 'Changes saved successfully.',
  },
  error: {
    invalidCredentials: 'Invalid email or password.',
    unauthorized: 'You are not authorized to access this resource.',
    duplicateEmail: 'An account with this email already exists.',
    server: 'Something went wrong. Please try again.',
    network: 'Unable to reach the server. Check your connection.',
    generic: 'Something went wrong. Please try again.',
  },
  warning: {
    requiredFields: 'Please fill all required fields.',
    invalidEmail: 'Please enter a valid email address.',
    weakPassword: 'Password must be at least 8 characters.',
    passwordMismatch: 'Passwords do not match.',
    termsRequired: 'Please agree to the Terms of Service and Privacy Policy.',
    sessionExpired: 'Your session has expired. Please sign in again.',
  },
}

export function getLoginSuccessMessage(user) {
  if (user?.role === USER_ROLES.ADMIN) {
    return 'Welcome back, Admin.'
  }

  const firstName = user?.name?.trim().split(/\s+/)[0]
  if (firstName) {
    return `Welcome back, ${firstName}.`
  }

  return 'Welcome back.'
}
