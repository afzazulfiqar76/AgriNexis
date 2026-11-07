import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/constants/authStorage'

/** Set in client/.env — e.g. http://localhost:8003 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/$/, '')

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

async function refreshAccessToken() {
  const refresh = getRefreshToken()
  if (!refresh) return null

  const response = await fetch(`${API_BASE}/api/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  if (!response.ok) {
    clearTokens()
    return null
  }

  const data = await response.json()
  if (data.access) {
    setTokens({ access: data.access, refresh: data.refresh ?? refresh })
    return data.access
  }

  return null
}

export async function apiRequest(path, options = {}) {
  const { auth = true, retry = true, headers = {}, body, ...rest } = options

  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (auth) {
    const token = getAccessToken()
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`
    }
  }

  let response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 401 && auth && retry) {
    const newAccess = await refreshAccessToken()
    if (newAccess) {
      requestHeaders.Authorization = `Bearer ${newAccess}`
      response = await fetch(`${API_BASE}${path}`, {
        ...rest,
        headers: requestHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      })
    }
  }

  return response
}

export async function parseJsonResponse(response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message =
      data.detail ||
      data.message ||
      Object.values(data)
        .flat()
        .find((v) => typeof v === 'string') ||
      'Request failed'
    const error = new Error(message)
    error.status = response.status
    error.data = data
    throw error
  }
  return data
}

export const tokenStorage = {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
}
