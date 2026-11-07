import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { AlertTriangle, MessageCircle, Send, X } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { useChatSession } from '../../hooks/useChatSession'
import {
  CHATBOT_NAME,
  getChatWelcomeContent,
  MODEL_UNAVAILABLE_MESSAGE,
} from '../../utils/chatWelcome'
import { ChatMessageContent, navigateChatHref } from './ChatMessageContent'
import { colors, fontFamily } from '../../constants/theme'
import { radius, spacing, touchTarget } from '../../constants/spacing'

const STORAGE_PREFIX = 'agrinexis'

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
    <View style={styles.typing} accessibilityRole="text" accessibilityLabel="Assistant is typing">
      <View style={styles.typingIcon}>
        <MessageCircle size={16} color={colors.primary} strokeWidth={2} />
      </View>
      <View style={styles.typingBody}>
        <Text style={styles.metaLabel}>{CHATBOT_NAME}</Text>
        <Text style={styles.typingText}>Typing…</Text>
      </View>
    </View>
  )
}

export function ChatPanel({ onClose, navigationRef, openChat }) {
  const { isAuthenticated, user } = useAuth()
  const [input, setInput] = useState('')
  const listRef = useRef(null)

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
    requestAnimationFrame(() => listRef.current?.scrollToEnd?.({ animated: true }))
  }, [messages, isLoading])

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return
    const text = input.trim()
    setInput('')
    await sendMessage(text)
  }, [input, isLoading, sendMessage])

  const handleClearChat = () => {
    Alert.alert('Clear chat', 'Clear this conversation history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => clearChat() },
    ])
  }

  const handleLink = useCallback(
    (href) => {
      navigateChatHref(navigationRef, href, { openChat, onNavigate: onClose })
    },
    [navigationRef, openChat, onClose],
  )

  const inputDisabled = isLoading || apiOnline === false || !restoreComplete

  const renderItem = ({ item: msg }) => {
    const isUser = msg.role === 'user'
    const isError = msg.type === 'error'

    if (isError) {
      return (
        <View style={styles.errorWrap}>
          <View style={styles.errorCard}>
            <View style={styles.errorTitleRow}>
              <AlertTriangle size={14} color={colors.amber800} strokeWidth={2} />
              <Text style={styles.errorTitle}>Error</Text>
            </View>
            <Text style={styles.errorBody}>{msg.content}</Text>
            {lastFailedUserText ? (
              <Pressable
                onPress={() => retryLast()}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Try again"
              >
                <Text style={[styles.retry, isLoading && styles.disabled]}>Try again</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      )
    }

    return (
      <View style={[styles.msgCol, isUser ? styles.msgEnd : styles.msgStart]}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>{isUser ? 'You' : CHATBOT_NAME}</Text>
          <Text style={styles.metaTime}>{formatTime(msg.timestamp)}</Text>
        </View>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          <ChatMessageContent content={msg.content} isUser={isUser} onLinkPress={handleLink} />
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.panel}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../../assets/chatbot_icon.png')}
            style={styles.headerIcon}
            accessibilityIgnoresInvertColors
          />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {CHATBOT_NAME}
            </Text>
            <View style={styles.statusRow}>
              {apiOnline === null ? (
                <Text style={styles.statusMuted}>Checking…</Text>
              ) : apiOnline ? (
                <Text style={styles.statusOnline}>Online</Text>
              ) : (
                <Text style={styles.statusOffline}>Offline</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={handleClearChat}
            style={styles.clearBtn}
            accessibilityRole="button"
            accessibilityLabel="Clear chat"
          >
            <Text style={styles.clearText}>Clear chat</Text>
          </Pressable>
          <Pressable
            onPress={onClose}
            style={styles.closeBtn}
            accessibilityRole="button"
            accessibilityLabel="Close chat"
            hitSlop={8}
          >
            <X size={20} color={colors.gray500} strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      <FlatList
        ref={listRef}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={restoreComplete ? messages : []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onContentSizeChange={() => listRef.current?.scrollToEnd?.({ animated: true })}
        ListHeaderComponent={
          apiOnline === false ? (
            <View style={styles.offlineBanner}>
              <AlertTriangle size={16} color={colors.danger} strokeWidth={2} />
              <Text style={styles.offlineText}>{MODEL_UNAVAILABLE_MESSAGE}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !restoreComplete ? (
            <Text style={styles.loadingConvo}>Loading conversation…</Text>
          ) : null
        }
        ListFooterComponent={
          isLoading && restoreComplete ? <TypingIndicator /> : <View style={{ height: 4 }} />
        }
      />

      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={`Ask ${CHATBOT_NAME} anything…`}
          placeholderTextColor={colors.gray400}
          editable={!inputDisabled}
          multiline
          onSubmitEditing={() => void handleSend()}
        />
        <Pressable
          style={[styles.sendBtn, (inputDisabled || !input.trim()) && styles.sendDisabled]}
          onPress={() => void handleSend()}
          disabled={inputDisabled || !input.trim()}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Send size={16} color="#fff" strokeWidth={2} />
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.base100,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#d1fae5',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
      },
      android: { elevation: 12 },
      default: {},
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: '#d1fae5',
    backgroundColor: colors.base200,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1, minWidth: 0 },
  headerIcon: { width: 40, height: 40, borderRadius: 12 },
  headerText: { flex: 1, minWidth: 0 },
  headerTitle: {
    fontSize: 14,
    fontFamily: fontFamily.semibold,
    color: colors.gray900,
  },
  statusRow: { marginTop: 2 },
  statusMuted: { fontSize: 12, fontFamily: fontFamily.regular, color: colors.gray500 },
  statusOnline: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.primary },
  statusOffline: { fontSize: 12, fontFamily: fontFamily.semibold, color: colors.danger },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clearBtn: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  clearText: { fontSize: 11, fontFamily: fontFamily.medium, color: colors.gray600 },
  closeBtn: {
    width: touchTarget - 8,
    height: touchTarget - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { flex: 1, backgroundColor: 'rgba(240, 253, 244, 0.4)' },
  listContent: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.lg },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
    padding: spacing.sm + 4,
    marginBottom: spacing.md,
  },
  offlineText: { flex: 1, fontSize: 13, fontFamily: fontFamily.medium, color: '#991b1b' },
  loadingConvo: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    marginTop: spacing.lg,
  },
  msgCol: { maxWidth: '85%', gap: 4 },
  msgStart: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  msgEnd: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: 4 },
  metaLabel: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaTime: { fontSize: 10, fontFamily: fontFamily.regular, color: colors.gray400 },
  bubble: {
    borderRadius: radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: radius.sm,
  },
  assistantBubble: {
    backgroundColor: colors.base100,
    borderWidth: 1,
    borderColor: '#d1fae5',
    borderBottomLeftRadius: radius.sm,
  },
  errorWrap: { maxWidth: 280, alignSelf: 'flex-start' },
  errorCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#fcd34d',
    backgroundColor: '#fffbeb',
    padding: spacing.sm + 4,
  },
  errorTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  errorTitle: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.amber800 },
  errorBody: { fontSize: 13, fontFamily: fontFamily.regular, color: '#78350f' },
  retry: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontFamily: fontFamily.semibold,
    color: colors.amber800,
    textDecorationLine: 'underline',
  },
  disabled: { opacity: 0.5 },
  typing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: '85%',
    borderRadius: radius.xl,
    borderBottomLeftRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#d1fae5',
    backgroundColor: colors.base100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    marginTop: spacing.sm,
  },
  typingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,163,108,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingBody: { gap: 2 },
  typingText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600 },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#d1fae5',
    backgroundColor: colors.base100,
    padding: spacing.sm + 4,
  },
  input: {
    flex: 1,
    minHeight: touchTarget,
    maxHeight: 100,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.base200,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingRight: spacing.md,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text,
  },
  sendBtn: {
    width: touchTarget - 4,
    height: touchTarget - 4,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.4 },
})
