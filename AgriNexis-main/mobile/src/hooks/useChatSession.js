import { useCallback, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ChatError,
  checkChatApiHealth,
  fetchChatHistory,
  saveChatHistory,
  sendChatMessage,
} from '../api/chatApi'
import {
  DEFAULT_WELCOME_LINE,
  getChatWelcomeContent,
  isLegacyWelcomeContent,
} from '../utils/chatWelcome'

export { DEFAULT_WELCOME_LINE, getChatWelcomeContent }

/** @deprecated Use getChatWelcomeContent() */
export const DEFAULT_WELCOME_CONTENT = getChatWelcomeContent()

let globalMsgCounter = 0

export function createWelcomeMessage(content = DEFAULT_WELCOME_CONTENT) {
  globalMsgCounter += 1
  return {
    id: `welcome-${globalMsgCounter}`,
    role: 'assistant',
    content,
    type: 'text',
    timestamp: new Date().toISOString(),
  }
}

export function normalizeStoredMessage(item, idx) {
  const role = item?.role === 'user' ? 'user' : 'assistant'
  const content =
    typeof item?.content === 'string'
      ? item.content
      : typeof item?.message === 'string'
        ? item.message
        : typeof item?.text === 'string'
          ? item.text
          : ''
  if (!content.trim()) return null
  if (item?.type === 'error') return null
  globalMsgCounter += 1
  return {
    id: item?.id || `m-restored-${idx}-${globalMsgCounter}`,
    role,
    content: content.trim(),
    type: 'text',
    timestamp: item?.timestamp || item?.created_at || new Date().toISOString(),
  }
}

export function toPersistedShape(messages) {
  return messages
    .filter((m) => m.type !== 'error')
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      message: m.content,
      content: m.content,
      timestamp: m.timestamp,
    }))
}

export function buildApiHistory(messages, excludeIds = new Set()) {
  return messages
    .filter(
      (m) =>
        m.type !== 'error' &&
        !excludeIds.has(m.id) &&
        (m.role === 'user' || m.role === 'assistant') &&
        m.content?.trim(),
    )
    .map((m) => ({ role: m.role, content: m.content.trim() }))
}

/**
 * Shared chat session: multi-turn API history, typed errors, optional persistence.
 */
export function useChatSession({
  welcomeContent = DEFAULT_WELCOME_CONTENT,
  storageKey = null,
  enableCloudSync = false,
  isAuthenticated = false,
} = {}) {
  const welcomeRef = useRef(createWelcomeMessage(welcomeContent))
  const [messages, setMessages] = useState([welcomeRef.current])
  const [isLoading, setIsLoading] = useState(false)
  const [apiOnline, setApiOnline] = useState(null)
  const [restoreComplete, setRestoreComplete] = useState(!storageKey)
  const [lastFailedUserText, setLastFailedUserText] = useState(null)
  const msgIdRef = useRef(0)

  const nextId = useCallback(() => {
    msgIdRef.current += 1
    return `m-${msgIdRef.current}`
  }, [])

  const runHealthCheck = useCallback(async () => {
    const ac = new AbortController()
    const t = setTimeout(() => ac.abort(), 6000)
    try {
      const ok = await checkChatApiHealth(ac.signal)
      setApiOnline(ok)
    } catch {
      setApiOnline(false)
    } finally {
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    runHealthCheck()
    const id = setInterval(runHealthCheck, 45000)
    return () => clearInterval(id)
  }, [runHealthCheck])

  useEffect(() => {
    const fresh = createWelcomeMessage(welcomeContent)
    welcomeRef.current = fresh
    setMessages((prev) => {
      if (prev.some((m) => m.role === 'user')) return prev
      return [fresh]
    })
  }, [welcomeContent])

  useEffect(() => {
    if (!storageKey) {
      setRestoreComplete(true)
      return undefined
    }

    let cancelled = false
    const run = async () => {
      setRestoreComplete(false)
      let localMessages = []
      try {
        const raw = await AsyncStorage.getItem(storageKey)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            localMessages = parsed.map(normalizeStoredMessage).filter(Boolean)
          }
        }
      } catch {
        localMessages = []
      }

      let nextMessages = localMessages.length ? localMessages : [welcomeRef.current]

      if (enableCloudSync && isAuthenticated) {
        try {
          const remote = await fetchChatHistory()
          if (!cancelled) {
            const remoteMessages = (Array.isArray(remote) ? remote : [])
              .map(normalizeStoredMessage)
              .filter(Boolean)
            if (remoteMessages.length > 0) nextMessages = remoteMessages
          }
        } catch {
          // local-only fallback
        }
      }

      if (!cancelled) {
        const hasUserMessages = nextMessages.some((m) => m.role === 'user')
        if (
          !hasUserMessages &&
          nextMessages.length === 1 &&
          nextMessages[0].role === 'assistant' &&
          isLegacyWelcomeContent(nextMessages[0].content)
        ) {
          nextMessages = [welcomeRef.current]
        }
        setMessages(nextMessages)
        setRestoreComplete(true)
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [storageKey, enableCloudSync, isAuthenticated])

  useEffect(() => {
    if (!storageKey || !restoreComplete) return
    AsyncStorage.setItem(storageKey, JSON.stringify(toPersistedShape(messages))).catch(() => {})
  }, [messages, storageKey, restoreComplete])

  useEffect(() => {
    if (!enableCloudSync || !isAuthenticated || !restoreComplete) return
    const timer = setTimeout(() => {
      saveChatHistory(toPersistedShape(messages)).catch(() => {})
    }, 500)
    return () => clearTimeout(timer)
  }, [messages, enableCloudSync, isAuthenticated, restoreComplete])

  const clearChat = useCallback(() => {
    const fresh = createWelcomeMessage(welcomeContent)
    welcomeRef.current = fresh
    setMessages([fresh])
    setLastFailedUserText(null)
    if (storageKey) {
      AsyncStorage.removeItem(storageKey).catch(() => {})
    }
    if (enableCloudSync && isAuthenticated) {
      saveChatHistory(toPersistedShape([fresh])).catch(() => {})
    }
  }, [welcomeContent, storageKey, enableCloudSync, isAuthenticated])

  const sendMessage = useCallback(
    async (textOverride) => {
      const userText = String(textOverride ?? '').trim()
      if (!userText || isLoading) return false

      const userMsg = {
        id: nextId(),
        role: 'user',
        content: userText,
        type: 'text',
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMsg])
      setLastFailedUserText(userText)
      setIsLoading(true)

      try {
        const history = buildApiHistory(messages)
        const aiText = await sendChatMessage(userText, history)
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            content: aiText,
            type: 'text',
            timestamp: new Date().toISOString(),
          },
        ])
        setLastFailedUserText(null)
        return true
      } catch (err) {
        const message =
          err instanceof ChatError
            ? err.message
            : err instanceof Error && err.message.trim()
              ? err.message.trim()
              : 'The AI service is temporarily unavailable.'
        const errorCode = err instanceof ChatError ? err.errorCode : 'AI_UNAVAILABLE'
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            content: message,
            type: 'error',
            errorCode,
            timestamp: new Date().toISOString(),
          },
        ])
        return false
      } finally {
        setIsLoading(false)
        void runHealthCheck()
      }
    },
    [isLoading, messages, nextId, runHealthCheck],
  )

  const retryLast = useCallback(async () => {
    if (!lastFailedUserText || isLoading) return

    setMessages((prev) => prev.filter((m) => m.type !== 'error'))
    setIsLoading(true)

    try {
      const convo = messages.filter((m) => m.type !== 'error')
      let historySource = convo
      const last = convo[convo.length - 1]
      if (last?.role === 'user' && last.content === lastFailedUserText) {
        historySource = convo.slice(0, -1)
      }
      const history = buildApiHistory(historySource)
      const aiText = await sendChatMessage(lastFailedUserText, history)
      setMessages((prev) => [
        ...prev.filter((m) => m.type !== 'error'),
        {
          id: nextId(),
          role: 'assistant',
          content: aiText,
          type: 'text',
          timestamp: new Date().toISOString(),
        },
      ])
      setLastFailedUserText(null)
    } catch (err) {
      const message =
        err instanceof ChatError
          ? err.message
          : 'The AI service is temporarily unavailable.'
      const errorCode = err instanceof ChatError ? err.errorCode : 'AI_UNAVAILABLE'
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: message,
          type: 'error',
          errorCode,
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
      void runHealthCheck()
    }
  }, [isLoading, lastFailedUserText, messages, nextId, runHealthCheck])

  return {
    messages,
    setMessages,
    isLoading,
    apiOnline,
    restoreComplete,
    sendMessage,
    retryLast,
    lastFailedUserText,
    clearChat,
    runHealthCheck,
  }
}
