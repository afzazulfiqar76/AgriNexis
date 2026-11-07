import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCESS_TOKEN_KEY } from '../constants/storage'
import { API_BASE } from './client'

const CHAT_URL = `${String(API_BASE).replace(/\/$/, '')}/api/chat/`

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
  AI_UNAVAILABLE: 'The model is currently unavailable. Please try again later.',
  RATE_LIMIT: 'The model is busy. Try again shortly.',
}

export function mapChatErrorCode(code, fallbackDetail) {
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code]
  if (fallbackDetail && String(fallbackDetail).trim()) return String(fallbackDetail).trim()
  return ERROR_MESSAGES.AI_UNAVAILABLE
}

export async function checkChatApiHealth(signal) {
  try {
    const res = await fetch(CHAT_URL, { method: 'GET', signal })
    if (res.status === 404 || res.status === 503) return false
    if (!res.ok && res.status !== 405) return false
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
      try {
        const data = await res.json()
        if (data?.ai_ready === false || data?.status === 'unavailable') return false
        if (data?.error_code === 'AI_UNAVAILABLE') return false
      } catch {
        /* ignore */
      }
    }
    if (res.status === 405) return true
    return res.ok
  } catch {
    return false
  }
}

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
  let data = {}
  try {
    data = rawText ? JSON.parse(rawText) : {}
  } catch {
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

async function authHeaders() {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function parseJsonSafe(rawText) {
  if (!rawText) return {}
  try {
    return JSON.parse(rawText)
  } catch {
    return {}
  }
}

export async function fetchChatHistory(signal) {
  const res = await fetch(`${CHAT_URL}history/`, {
    method: 'GET',
    headers: { ...(await authHeaders()) },
    signal,
  })
  const rawText = await res.text()
  const data = parseJsonSafe(rawText)
  if (!res.ok) throw new Error(data?.detail || `History fetch failed (${res.status})`)
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.messages)) return data.messages
  return []
}

/** Optional cloud sync — backend may not implement; callers catch silently. */
export async function saveChatHistory(messages) {
  const res = await fetch(`${CHAT_URL}history/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
    body: JSON.stringify({ messages }),
  })

  if (!res.ok) {
    const rawText = await res.text()
    const data = parseJsonSafe(rawText)
    throw new Error(data?.detail || `History save failed (${res.status})`)
  }
}

export { ERROR_MESSAGES as CHAT_ERROR_MESSAGES, CHAT_URL }
