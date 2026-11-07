import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Plus, Send, Sprout, X, AlertTriangle } from 'lucide-react'
import { ChatMessageContent } from '@/components/chat/ChatMessageContent'
import { useAuth } from '@/contexts/AuthContext'
import { useChatSession } from '@/hooks/useChatSession'
import { ROUTES } from '@/constants/routes'
import { CHATBOT_NAME, getChatWelcomeContent, MODEL_UNAVAILABLE_MESSAGE } from '@/utils/chatWelcome'

const SUGGESTIONS = [
  'What is AgriNexis?',
  'How do I use AI Plant Doctor?',
  'Where are IoT Sensors?',
  'How do I join Community?',
  'Where are FAQs?',
  'How do I contact support?',
]

const TIPS = [
  'Ask about AgriNexis features',
  'Get help navigating pages',
  'Find FAQs and Contact',
]

const STORAGE_KEY = 'agrinexis:chat:history:aichat-page'

export function AiChatPage() {
  const { isAuthenticated, user } = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
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
    storageKey: STORAGE_KEY,
  })

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async (textOverride) => {
    const userText = (textOverride ?? input).trim()
    if (!userText || isLoading) return
    setInput('')
    await sendMessage(userText)
  }

  const inputDisabled = isLoading || apiOnline === false

  return (
    <div className="flex h-screen w-full overflow-hidden bg-base-200 text-gray-900">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-emerald-100 bg-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sprout className="size-5" aria-hidden />
            </div>
            <div>
              <h1 className="text-sm font-bold">{CHATBOT_NAME}</h1>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="ml-auto lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              clearChat()
              setInput('')
            }}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-content shadow-md transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" aria-hidden />
            <span>New Chat</span>
          </button>

          <nav className="flex-1 space-y-2 overflow-y-auto">
            <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Tips
            </p>
            {TIPS.map((label) => (
              <div
                key={label}
                className="rounded-lg px-3 py-2 text-sm text-gray-600"
              >
                {label}
              </div>
            ))}
          </nav>

          <Link
            to={ROUTES.HOME}
            className="mt-4 text-center text-sm font-medium text-primary hover:underline"
          >
            Back to AgriNexis
          </Link>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-emerald-100 bg-white/90 p-4 backdrop-blur-md lg:px-8 lg:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary lg:size-10">
              <Sprout className="size-5" aria-hidden />
            </div>
            <Link to={ROUTES.HOME}>
              <div>
                <h2 className="text-sm font-bold tracking-tight lg:text-lg">{CHATBOT_NAME}</h2>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-2 shrink-0 rounded-full ${
                      apiOnline === false
                        ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.75)]'
                        : apiOnline === null
                          ? 'bg-gray-400 animate-pulse'
                          : 'bg-primary animate-pulse'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      apiOnline === false
                        ? 'text-red-600'
                        : apiOnline === null
                          ? 'text-gray-500'
                          : 'text-primary'
                    }`}
                  >
                    {apiOnline === false ? 'Offline' : apiOnline === null ? 'Checking…' : 'Online'}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </header>

        <div className="mx-auto h-[73vh] w-full max-w-5xl space-y-5 overflow-y-scroll p-3 pt-[6rem] lg:p-8 lg:pt-[7rem]">
          {apiOnline === false ? (
            <div
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
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
                  <div key={msg.id} className="flex max-w-[85%] flex-col gap-2">
                    <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                      <p className="font-medium">{msg.content}</p>
                      {lastFailedUserText ? (
                        <button
                          type="button"
                          onClick={() => retryLast()}
                          disabled={isLoading}
                          className="mt-2 text-xs font-bold uppercase tracking-wide text-amber-800 underline disabled:opacity-50"
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
                  className={`flex items-end gap-3 lg:items-start lg:gap-4 ${
                    isUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full lg:size-10 ${
                      isUser
                        ? 'bg-emerald-800 text-white'
                        : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                    }`}
                  >
                    <Sprout className="size-4" aria-hidden />
                  </div>

                  <div
                    className={`flex max-w-[85%] flex-col gap-1 lg:max-w-[80%] ${
                      isUser ? 'items-end' : ''
                    }`}
                  >
                    <p
                      className={`px-1 text-[10px] font-bold uppercase tracking-widest ${
                        isUser ? 'text-emerald-700' : 'text-primary'
                      }`}
                    >
                      {isUser ? 'You' : CHATBOT_NAME}
                    </p>

                    <div
                      className={`rounded-2xl px-4 py-3 lg:px-6 lg:py-4 ${
                        isUser
                          ? 'rounded-br-none bg-primary text-primary-content'
                          : 'rounded-bl-none border border-emerald-100 bg-white text-gray-800 lg:rounded-bl-2xl lg:rounded-tl-none'
                      }`}
                    >
                      <ChatMessageContent content={msg.content} isUser={isUser} />
                    </div>
                  </div>
                </div>
              )
            })
          )}

          {isLoading ? (
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Sprout className="size-4 animate-pulse text-primary" aria-hidden />
              {CHATBOT_NAME} is typing…
            </div>
          ) : null}
          <div ref={chatEndRef} />
        </div>

        <div className="mx-auto w-full max-w-5xl border-t border-emerald-100 bg-gradient-to-t from-base-200 via-base-200 to-transparent p-4 lg:px-6 lg:py-4">
          <div className="mb-2 flex gap-2 overflow-x-auto pb-4 lg:pb-2">
            {SUGGESTIONS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => void handleSend(label)}
                disabled={inputDisabled}
                className="shrink-0 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative mb-5 flex items-end gap-2 rounded-2xl border border-emerald-200 bg-white p-2 shadow-lg focus-within:border-primary lg:gap-3 lg:p-3">
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
              className="flex-1 border-none bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 disabled:opacity-50 lg:text-base"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={inputDisabled || !input.trim()}
              className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </main>

      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </div>
  )
}
