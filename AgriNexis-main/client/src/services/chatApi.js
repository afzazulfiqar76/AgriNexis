import { tokenStorage } from '@/lib/apiClient'

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/$/, '')
const CHAT_URL = `${API_BASE}/api/chat/`

/**
 * Chat API error with stable error_code from backend.
 */
export class ChatError extends Error {
  constructor(message, { errorCode = null, status = null } = {}) {
    super(message)
    this.name = 'ChatError'
    this.errorCode = errorCode
    this.status = status
  }
}

const ERROR_MESSAGES = {
  AI_TIMEOUT: 'AI response generation is taking longer than expected. Please try again.',
  CATALOG_UNAVAILABLE: 'I cannot access product data right now. Please try again later.',
  AI_UNAVAILABLE: 'The model is currently unavailable. Please try again later.',
  RATE_LIMIT: 'The model is busy. Try again shortly.',
}

export function mapChatErrorCode(code, fallbackDetail) {
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code]
  if (fallbackDetail && String(fallbackDetail).trim()) return String(fallbackDetail).trim()
  return ERROR_MESSAGES.AI_UNAVAILABLE
}

/**
 * Health check — online only when the AI model backend is ready (ai_ready).
 */
export async function checkChatApiHealth(signal) {
  try {
    const res = await fetch(CHAT_URL, { method: 'GET', signal })
    if (res.status === 404) return false
    if (res.status === 503) return false
    if (!res.ok && res.status !== 405) return false

    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
      try {
        const data = await res.json()
        if (data?.ai_ready === false || data?.status === 'unavailable') return false
        if (data?.error_code === 'AI_UNAVAILABLE') return false
      } catch {
        // ignore parse errors; fall through on HTTP ok
      }
    }

    if (res.status === 405) return true
    return res.ok
  } catch {
    return false
  }
}

/**
 * POST { message, history } → response text or throws ChatError.
 */
export async function sendChatMessage(message, history = []) {
  const payload = {
    message,
    history: Array.isArray(history)
      ? history
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content?.trim())
          .map((m) => ({ role: m.role, content: m.content.trim() }))
      : [],
  }

  let res
  try {
    res = await fetch(CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ChatError(ERROR_MESSAGES.AI_UNAVAILABLE, { errorCode: 'AI_UNAVAILABLE' })
  }

  const rawText = await res.text()
  const ctype = res.headers.get('content-type') || ''
  let data
  if (ctype.includes('application/json') || rawText.trim().startsWith('{')) {
    try {
      data = rawText ? JSON.parse(rawText) : {}
    } catch {
      throw new ChatError(ERROR_MESSAGES.AI_UNAVAILABLE, { errorCode: 'AI_UNAVAILABLE' })
    }
  } else {
    throw new ChatError(ERROR_MESSAGES.AI_UNAVAILABLE, { errorCode: 'AI_UNAVAILABLE' })
  }

  if (!res.ok) {
    const code = data?.error_code || null
    const detail = data?.detail
    const msg = mapChatErrorCode(
      code,
      typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map((e) => e?.message || String(e)).join(' ')
          : data?.message,
    )
    throw new ChatError(msg, { errorCode: code, status: res.status })
  }

  const text = data?.response
  if (typeof text !== 'string' || !text.trim()) {
    throw new ChatError(ERROR_MESSAGES.AI_UNAVAILABLE, { errorCode: 'AI_UNAVAILABLE' })
  }

  return text.trim()
}

function parseJsonSafe(rawText) {
  if (!rawText) return {}
  try {
    return JSON.parse(rawText)
  } catch {
    return {}
  }
}

function getAuthHeaders() {
  const token = tokenStorage.getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/** Optional cloud sync — backend may not implement; callers catch silently. */
export async function fetchChatHistory(signal) {
  const res = await fetch(`${CHAT_URL}history/`, {
    method: 'GET',
    headers: { ...getAuthHeaders() },
    signal,
  })

  const rawText = await res.text()
  const data = parseJsonSafe(rawText)
  if (!res.ok) throw new Error(data?.detail || `History fetch failed (${res.status})`)

  if (Array.isArray(data)) return data
  if (Array.isArray(data?.messages)) return data.messages
  return []
}

export async function saveChatHistory(messages) {
  const res = await fetch(`${CHAT_URL}history/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ messages }),
  })

  if (!res.ok) {
    const rawText = await res.text()
    const data = parseJsonSafe(rawText)
    throw new Error(data?.detail || `History save failed (${res.status})`)
  }
}

export { ERROR_MESSAGES as CHAT_ERROR_MESSAGES }
