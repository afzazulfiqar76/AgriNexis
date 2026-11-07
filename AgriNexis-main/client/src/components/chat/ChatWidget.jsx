import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertTriangle, MessageCircle, Send, X } from 'lucide-react'
import { ChatMessageContent } from '@/components/chat/ChatMessageContent'
import { useAuth } from '@/contexts/AuthContext'
import { useChatSession } from '@/hooks/useChatSession'
import { CHATBOT_NAME, getChatWelcomeContent, MODEL_UNAVAILABLE_MESSAGE } from '@/utils/chatWelcome'

const STORAGE_PREFIX = 'agrinexis'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? !window.matchMedia('(min-width: 768px)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsMobile(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return isMobile
}

function useFooterNearViewport(enabled) {
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setNearFooter(false)
      return undefined
    }
    const footer = document.querySelector('[data-site-footer]')
    if (!footer) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [enabled])

  return nearFooter
}

function getChatStorageKey(userId) {
  return userId
    ? `${STORAGE_PREFIX}:chat:history:user:${userId}`
    : `${STORAGE_PREFIX}:chat:history:guest`
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

function TypingIndicator() {
  return (
    <div
      className="flex w-full max-w-[85%] items-center gap-3 rounded-2xl rounded-bl-md border border-emerald-100 bg-white px-4 py-3 shadow-sm"
      role="status"
      aria-live="polite"
      aria-label="Assistant is typing"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MessageCircle className="size-4" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {CHATBOT_NAME}
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Typing</span>
          <span className="inline-flex gap-1">
            <span className="size-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
          </span>
        </div>
      </div>
    </div>
  )
}

function shouldHideChat(pathname) {
  if (!pathname) return false
  if (pathname.startsWith('/admin')) return true
  if (pathname === '/signin' || pathname === '/signup') return true
  return false
}

function ChatPanel({ onClose }) {
  const { isAuthenticated, user } = useAuth()
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  const welcomeContent = useMemo(
    () => getChatWelcomeContent({ user, isAuthenticated }),
    [user, isAuthenticated],
  )

  const {
    messages,
    isLoading,
    apiOnline,
    restoreComplete,
    sendMessage,
    retryLast,
    lastFailedUserText,
    clearChat,
  } = useChatSession({
    welcomeContent,
    storageKey: getChatStorageKey(user?.id),
    enableCloudSync: isAuthenticated,
    isAuthenticated,
  })

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return
    const text = input.trim()
    setInput('')
    await sendMessage(text)
  }, [input, isLoading, sendMessage])

  const handleClearChat = () => {
    if (!window.confirm('Clear this conversation history?')) return
    clearChat()
  }

  const inputDisabled = isLoading || apiOnline === false || !restoreComplete

  return (
    <div
      className="mb-4 flex h-[min(650px,71vh)] w-[min(100vw-1.5rem,400px)] max-h-[71vh] flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-base-100 shadow-2xl"
      role="dialog"
      aria-label={CHATBOT_NAME}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-emerald-100 bg-base-200/80 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/chatbot_icon.png"
            alt=""
            className="size-10 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-gray-900">{CHATBOT_NAME}</h2>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              {apiOnline === null && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="size-2 animate-pulse rounded-full bg-gray-400" />
                  Checking…
                </span>
              )}
              {apiOnline === true && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  Online
                </span>
              )}
              {apiOnline === false && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                  <span className="size-2.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.75)]" />
                  Offline
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleClearChat}
            className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[11px] font-medium text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          >
            Clear chat
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white hover:text-gray-900"
            aria-label="Close chat"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </header>

      <main className="relative flex-1 space-y-4 overflow-y-auto bg-base-200/40 p-4 [scrollbar-width:thin]">
        {apiOnline === false ? (
          <div
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
            role="status"
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden />
            <p className="font-medium">{MODEL_UNAVAILABLE_MESSAGE}</p>
          </div>
        ) : null}
        {!restoreComplete ? (
          <p className="text-center text-sm text-gray-500">Loading conversation…</p>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user'
            const isError = msg.type === 'error'

            if (isError) {
              return (
                <div key={msg.id} className="flex max-w-[min(85%,280px)] flex-col gap-2">
                  <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                    <div className="mb-1 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
                      Error
                    </div>
                    <p>{msg.content}</p>
                    {lastFailedUserText ? (
                      <button
                        type="button"
                        onClick={() => retryLast()}
                        disabled={isLoading}
                        className="mt-2 text-xs font-semibold text-amber-800 underline disabled:opacity-50"
                      >
                        Try again
                      </button>
                    ) : null}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {isUser ? 'You' : CHATBOT_NAME}
                  </span>
                  <span className="text-[10px] text-gray-400">{formatTime(msg.timestamp)}</span>
                </div>
                <div
                  className={`max-w-[min(85%,280px)] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                    isUser
                      ? 'rounded-br-md bg-primary text-primary-content'
                      : 'rounded-bl-md border border-emerald-100 bg-white text-gray-800'
                  }`}
                >
                  <ChatMessageContent content={msg.content} isUser={isUser} />
                </div>
              </div>
            )
          })
        )}

        {isLoading && restoreComplete ? <TypingIndicator /> : null}
        <div ref={chatEndRef} />
      </main>

      <footer className="shrink-0 border-t border-emerald-100 bg-white p-3">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void handleSend()
              }
            }}
            placeholder={`Ask ${CHATBOT_NAME} anything…`}
            disabled={inputDisabled}
            className="w-full rounded-xl border border-gray-200 bg-base-200/50 py-3 pl-4 pr-14 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={inputDisabled || !input.trim()}
            className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-primary-content transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="size-4" aria-hidden />
          </button>
        </div>
      </footer>
    </div>
  )
}

export function ChatWidget() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const nearFooter = useFooterNearViewport(isMobile)

  if (shouldHideChat(pathname)) return null

  let bottom = '1.5rem'
  let right = '1.25rem'
  if (isMobile) {
    right = '1rem'
    bottom = nearFooter ? '5rem' : 'max(1rem, env(safe-area-inset-bottom))'
  }

  return (
    <div
      className="fixed z-[9999] flex flex-col items-end"
      style={{ bottom, right }}
    >
      {isOpen ? <ChatPanel onClose={() => setIsOpen(false)} /> : null}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={
          isOpen
            ? 'relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            : 'relative flex appearance-none items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
        }
        aria-label={isOpen ? 'Close chat' : `Open ${CHATBOT_NAME}`}
      >
        {isOpen ? (
          <X className="size-6" aria-hidden />
        ) : (
          <img
            src="/chatbot_icon.png"
            alt=""
            className="pointer-events-none size-[4.75rem] object-contain"
            draggable={false}
          />
        )}
      </button>
    </div>
  )
}
