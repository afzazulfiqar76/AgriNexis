import toast from 'react-hot-toast'
import { AuthToast } from '@/components/ui/AuthToast'
import { AUTH_MESSAGES } from '@/constants/authMessages'
import { parseAuthApiError } from '@/utils/authErrors'

const AUTH_TOAST_ID = 'auth-toast'
const DEFAULT_DURATION = 3200

function show(variant, message, options = {}) {
  const { duration = DEFAULT_DURATION } = options

  toast.dismiss()

  return toast.custom(
    (t) => (
      <AuthToast
        variant={variant}
        message={message}
        visible={t.visible}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ),
    { id: AUTH_TOAST_ID, duration },
  )
}

export function showSuccess(message, options) {
  return show('success', message, options)
}

export function showError(message, options) {
  return show('error', message, options)
}

export function showWarning(message, options) {
  return show('warning', message, options)
}

export function showSessionExpired() {
  return show('warning', AUTH_MESSAGES.warning.sessionExpired)
}

export function showAuthApiError(error) {
  const { variant, message } = parseAuthApiError(error)

  if (variant === 'warning') {
    return showWarning(message)
  }
  return showError(message)
}
