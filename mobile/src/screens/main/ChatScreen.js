import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Send } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { checkChatApiHealth, ChatError, sendChatMessage } from '../../api/chatApi'
import {
  CHATBOT_NAME,
  getChatWelcomeContent,
  MODEL_UNAVAILABLE_MESSAGE,
} from '../../utils/chatWelcome'
import { colors, fontFamily } from '../../constants/theme'
import { radius, spacing, touchTarget } from '../../constants/spacing'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function ChatScreen() {
  const { user, isAuthenticated } = useAuth()
  const insets = useSafeAreaInsets()
  const listRef = useRef(null)
  const [online, setOnline] = useState(true)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: makeId('welcome'),
      role: 'assistant',
      content: getChatWelcomeContent({ user, isAuthenticated }),
    },
  ])

  useEffect(() => {
    const controller = new AbortController()
    checkChatApiHealth(controller.signal).then(setOnline)
    return () => controller.abort()
  }, [])

  const historyPayload = useCallback(() => {
    return messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content }))
  }, [messages])

  const send = async (text) => {
    const trimmed = String(text ?? '').trim()
    if (!trimmed || sending) return
    if (!online) {
      setMessages((prev) => [
        ...prev,
        { id: makeId('user'), role: 'user', content: trimmed },
        { id: makeId('err'), role: 'assistant', content: MODEL_UNAVAILABLE_MESSAGE },
      ])
      setInput('')
      return
    }

    const userMsg = { id: makeId('user'), role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSending(true)
    try {
      const reply = await sendChatMessage(trimmed, historyPayload())
      setMessages((prev) => [...prev, { id: makeId('assistant'), role: 'assistant', content: reply }])
    } catch (err) {
      const msg =
        err instanceof ChatError ? err.message : MODEL_UNAVAILABLE_MESSAGE
      setMessages((prev) => [
        ...prev,
        { id: makeId('assistant'), role: 'assistant', content: msg },
      ])
      if (err instanceof ChatError && err.errorCode === 'AI_UNAVAILABLE') {
        setOnline(false)
      }
    } finally {
      setSending(false)
      requestAnimationFrame(() => listRef.current?.scrollToEnd?.({ animated: true }))
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      {!online ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{MODEL_UNAVAILABLE_MESSAGE}</Text>
        </View>
      ) : null}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd?.({ animated: true })}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === 'user' ? styles.userBubble : styles.assistantBubble,
            ]}
          >
            {item.role === 'assistant' ? (
              <Text style={styles.botLabel}>{CHATBOT_NAME}</Text>
            ) : null}
            <Text style={[styles.bubbleText, item.role === 'user' && styles.userText]}>
              {item.content}
            </Text>
          </View>
        )}
      />

      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about AgriNexis…"
          placeholderTextColor={colors.gray400}
          editable={!sending}
          multiline
          onSubmitEditing={() => send(input)}
        />
        <Pressable
          style={[styles.sendBtn, (!input.trim() || sending) && styles.sendDisabled]}
          onPress={() => send(input)}
          disabled={!input.trim() || sending}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          {sending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Send size={18} color="#fff" strokeWidth={2} />
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.base200 },
  banner: {
    backgroundColor: '#fef2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#fecaca',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bannerText: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.danger },
  list: { padding: spacing.md, paddingBottom: spacing.lg, gap: spacing.sm },
  bubble: {
    maxWidth: '88%',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.base100,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  botLabel: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  bubbleText: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.text,
    lineHeight: 22,
  },
  userText: { color: '#fff' },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.base100,
  },
  input: {
    flex: 1,
    minHeight: touchTarget,
    maxHeight: 120,
    borderRadius: radius.md,
    backgroundColor: colors.base300,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.text,
  },
  sendBtn: {
    width: touchTarget,
    height: touchTarget,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.5 },
})
