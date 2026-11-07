import { apiRequest, parseJsonResponse, tokenStorage } from '@/lib/apiClient'
import { AUTH_USER_KEY } from '@/constants/authStorage'
import { mapApiUser } from '@/constants/auth'

function persistSession(data) {
  const { user, tokens } = data
  tokenStorage.setTokens(tokens)
  const mapped = mapApiUser(user)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mapped))
  return mapped
}

export function readStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearStoredSession() {
  tokenStorage.clearTokens()
  localStorage.removeItem(AUTH_USER_KEY)
}

export async function loginRequest(email, password) {
  const response = await apiRequest('/api/auth/login/', {
    method: 'POST',
    auth: false,
    body: { email, password },
  })
  const data = await parseJsonResponse(response)
  return persistSession(data)
}

export async function registerRequest({ fullName, email, password, phoneNumber }) {
  const response = await apiRequest('/api/auth/register/', {
    method: 'POST',
    auth: false,
    body: {
      full_name: fullName,
      email,
      password,
      phone_number: phoneNumber || '',
    },
  })
  const data = await parseJsonResponse(response)
  return persistSession(data)
}

export async function logoutRequest() {
  const refresh = tokenStorage.getRefreshToken()
  try {
    if (refresh) {
      await apiRequest('/api/auth/logout/', {
        method: 'POST',
        body: { refresh },
      })
    }
  } finally {
    clearStoredSession()
  }
}

export async function fetchCurrentUser() {
  const response = await apiRequest('/api/auth/me/', { method: 'GET' })
  const user = await parseJsonResponse(response)
  const mapped = mapApiUser(user)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mapped))
  return mapped
}

const BOOTSTRAP_TIMEOUT_MS = 8000

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Auth bootstrap timed out')), ms)
    }),
  ])
}

export async function bootstrapSession() {
  const access = tokenStorage.getAccessToken()
  if (!access) {
    clearStoredSession()
    return null
  }
  try {
    return await withTimeout(fetchCurrentUser(), BOOTSTRAP_TIMEOUT_MS)
  } catch {
    clearStoredSession()
    return null
  }
}
