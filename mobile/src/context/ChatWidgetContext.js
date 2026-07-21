import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ChatWidgetContext = createContext(null)

export function ChatWidgetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const toggleChat = useCallback(() => setIsOpen((v) => !v), [])

  const value = useMemo(
    () => ({ isOpen, setIsOpen, openChat, closeChat, toggleChat }),
    [isOpen, openChat, closeChat, toggleChat],
  )

  return <ChatWidgetContext.Provider value={value}>{children}</ChatWidgetContext.Provider>
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext)
  if (!ctx) {
    throw new Error('useChatWidget must be used within ChatWidgetProvider')
  }
  return ctx
}
