import { AUTH_MESSAGES } from '@/constants/authMessages'

function flattenDrfMessages(data) {
  if (!data || typeof data !== 'object') return []

  const messages = []

  if (typeof data.detail === 'string') {
    messages.push(data.detail)
  } else if (Array.isArray(data.detail)) {
    messages.push(...data.detail.filter((v) => typeof v === 'string'))
  }

  if (Array.isArray(data.non_field_errors)) {
    messages.push(...data.non_field_errors.filter((v) => typeof v === 'string'))
  }

  for (const [key, value] of Object.entries(data)) {
    if (key === 'detail' || key === 'non_field_errors') continue
    if (Array.isArray(value)) {
      value
        .filter((v) => typeof v === 'string')
        .forEach((msg) => messages.push(msg))
    } else if (typeof value === 'string') {
      messages.push(value)
    }
  }

  return messages
}

function isDuplicateEmail(data) {
  const emailErrors = data?.email
  const flat = flattenDrfMessages(data).join(' ').toLowerCase()
  const emailText = Array.isArray(emailErrors)
    ? emailErrors.join(' ').toLowerCase()
    : String(emailErrors ?? '').toLowerCase()

  return (
    emailText.includes('already exists') ||
    emailText.includes('unique') ||
    flat.includes('already exists')
  )
}

function isPasswordValidation(data) {
  return Boolean(data?.password?.length || flattenDrfMessages(data).some((m) =>
    /password/i.test(m),
  ))
}

/**
 * @returns {{ variant: 'error' | 'warning', message: string, id: string }}
 */
export function parseAuthApiError(error) {
  const status = error?.status
  const data = error?.data ?? {}

  if (error instanceof TypeError || status === 0) {
    return {
      variant: 'error',
      message: AUTH_MESSAGES.error.network,
      id: 'auth-api-network',
    }
  }

  if (status === 401) {
    return {
      variant: 'error',
      message: AUTH_MESSAGES.error.invalidCredentials,
      id: 'auth-api-unauthorized',
    }
  }

  if (status === 403) {
    return {
      variant: 'error',
      message: AUTH_MESSAGES.error.unauthorized,
      id: 'auth-api-forbidden',
    }
  }

  if (status === 400) {
    const messages = flattenDrfMessages(data)
    if (
      messages.some((m) =>
        /invalid email or password|deactivated|credentials/i.test(m),
      )
    ) {
      return {
        variant: 'error',
        message:
          messages.find((m) => /deactivated/i.test(m)) ??
          AUTH_MESSAGES.error.invalidCredentials,
        id: 'auth-api-credentials',
      }
    }
  }

  if (status === 400 && isDuplicateEmail(data)) {
    return {
      variant: 'error',
      message: AUTH_MESSAGES.error.duplicateEmail,
      id: 'auth-api-duplicate-email',
    }
  }

  if (status === 400 && isPasswordValidation(data)) {
    const messages = flattenDrfMessages(data)
    return {
      variant: 'warning',
      message: messages[0] ?? AUTH_MESSAGES.warning.weakPassword,
      id: 'auth-api-password',
    }
  }

  if (status >= 500) {
    return {
      variant: 'error',
      message: AUTH_MESSAGES.error.server,
      id: 'auth-api-server',
    }
  }

  const messages = flattenDrfMessages(data)
  const fallback = error?.message ?? AUTH_MESSAGES.error.generic

  if (
    messages.some((m) =>
      /invalid email or password/i.test(m),
    )
  ) {
    return {
      variant: 'error',
      message: AUTH_MESSAGES.error.invalidCredentials,
      id: 'auth-api-credentials',
    }
  }

  return {
    variant: 'error',
    message: messages[0] ?? fallback,
    id: 'auth-api-error',
  }
}
