import { Linking, StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'
import {
  UNVERIFIED_PAGE_MESSAGE,
  WEB_PATH_TO_NAV,
  isInternalPath,
  pathFromChatHref,
  validateChatLink,
} from '../../utils/chatLinkPolicy'

/**
 * @param {import('@react-navigation/native').NavigationContainerRef} navigationRef
 * @param {() => void} [openChat]
 * @param {() => void} [onNavigate]
 */
export function navigateChatHref(navigationRef, href, { openChat, onNavigate } = {}) {
  const result = validateChatLink(href)
  if (!result.allowed) return

  const navRef = navigationRef?.current ?? navigationRef
  const target = result.href
  if (!target || target.startsWith('mailto:')) {
    if (target?.startsWith('mailto:')) Linking.openURL(target).catch(() => {})
    return
  }

  if (isInternalPath(target) || /^https?:\/\//i.test(target)) {
    const path = pathFromChatHref(target)
    const nav = path ? WEB_PATH_TO_NAV[path] : null
    if (nav?.type === 'openChat') {
      openChat?.()
      onNavigate?.()
      return
    }
    if (nav && navRef?.isReady?.()) {
      onNavigate?.()
      try {
        if (nav.type === 'tabs') {
          navRef.navigate('Tabs', { screen: nav.screen })
        } else if (nav.type === 'stack') {
          navRef.navigate(nav.name)
        }
      } catch {
        // route may not exist on current stack (e.g. guest)
      }
      return
    }
  }

  if (/^https?:\/\//i.test(target)) {
    Linking.openURL(target).catch(() => {})
    onNavigate?.()
  }
}

/**
 * Lightweight markdown → RN elements (avoids react-native-markdown-display web crashes).
 * Supports headings, bold, italic, lists, links, inline code, paragraphs.
 */
function renderMarkdown(text, onLinkPress) {
  const lines = String(text).replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let listBuf = null

  const flushList = () => {
    if (!listBuf) return
    blocks.push({ type: 'list', ordered: listBuf.ordered, items: listBuf.items })
    listBuf = null
  }

  for (const raw of lines) {
    const line = raw
    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    const ul = /^[-*]\s+(.+)$/.exec(line)
    const ol = /^(\d+)\.\s+(.+)$/.exec(line)

    if (heading) {
      flushList()
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] })
      continue
    }
    if (ul) {
      if (!listBuf || listBuf.ordered) {
        flushList()
        listBuf = { ordered: false, items: [] }
      }
      listBuf.items.push(ul[1])
      continue
    }
    if (ol) {
      if (!listBuf || !listBuf.ordered) {
        flushList()
        listBuf = { ordered: true, items: [] }
      }
      listBuf.items.push(ol[2])
      continue
    }
    flushList()
    if (line.trim() === '') {
      blocks.push({ type: 'spacer' })
    } else {
      blocks.push({ type: 'paragraph', text: line })
    }
  }
  flushList()
  return blocks
}

function InlineText({ text, baseStyle, onLinkPress }) {
  // Split **bold**, *italic*, `code`, [label](url)
  const parts = []
  const re =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m
  const src = String(text ?? '')
  while ((m = re.exec(src))) {
    if (m.index > last) {
      parts.push({ type: 'text', value: src.slice(last, m.index) })
    }
    const token = m[0]
    if (token.startsWith('**')) {
      parts.push({ type: 'bold', value: token.slice(2, -2) })
    } else if (token.startsWith('*')) {
      parts.push({ type: 'italic', value: token.slice(1, -1) })
    } else if (token.startsWith('`')) {
      parts.push({ type: 'code', value: token.slice(1, -1) })
    } else if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (link) parts.push({ type: 'link', label: link[1], href: link[2] })
    }
    last = m.index + token.length
  }
  if (last < src.length) parts.push({ type: 'text', value: src.slice(last) })

  return (
    <Text style={baseStyle}>
      {parts.map((p, i) => {
        if (p.type === 'bold') {
          return (
            <Text key={i} style={styles.strong}>
              {p.value}
            </Text>
          )
        }
        if (p.type === 'italic') {
          return (
            <Text key={i} style={styles.em}>
              {p.value}
            </Text>
          )
        }
        if (p.type === 'code') {
          return (
            <Text key={i} style={styles.code}>
              {p.value}
            </Text>
          )
        }
        if (p.type === 'link') {
          const result = validateChatLink(p.href)
          if (!result.allowed) {
            return (
              <Text key={i} style={styles.denied}>
                {result.message || UNVERIFIED_PAGE_MESSAGE}
              </Text>
            )
          }
          return (
            <Text
              key={i}
              style={styles.link}
              onPress={() => {
                if (onLinkPress) onLinkPress(result.href)
                else if (/^https?:\/\//i.test(result.href)) Linking.openURL(result.href).catch(() => {})
              }}
            >
              {p.label}
            </Text>
          )
        }
        return <Text key={i}>{p.value}</Text>
      })}
    </Text>
  )
}

export function ChatMessageContent({ content, isUser = false, onLinkPress }) {
  const text = String(content ?? '').trim()
  if (!text) return null

  if (isUser) {
    return <Text style={styles.userText}>{text}</Text>
  }

  const blocks = renderMarkdown(text, onLinkPress)

  return (
    <View style={styles.wrap}>
      {blocks.map((b, i) => {
        if (b.type === 'spacer') return <View key={i} style={styles.spacer} />
        if (b.type === 'heading') {
          const hs = b.level === 1 ? styles.h1 : b.level === 2 ? styles.h2 : styles.h3
          return <InlineText key={i} text={b.text} baseStyle={hs} onLinkPress={onLinkPress} />
        }
        if (b.type === 'list') {
          return (
            <View key={i} style={styles.list}>
              {b.items.map((item, j) => (
                <View key={j} style={styles.listItem}>
                  <Text style={styles.bullet}>{b.ordered ? `${j + 1}.` : '•'}</Text>
                  <View style={styles.listBody}>
                    <InlineText text={item} baseStyle={styles.paragraph} onLinkPress={onLinkPress} />
                  </View>
                </View>
              ))}
            </View>
          )
        }
        return <InlineText key={i} text={b.text} baseStyle={styles.paragraph} onLinkPress={onLinkPress} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  userText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fontFamily.regular,
    color: '#ffffff',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fontFamily.regular,
    color: colors.gray800,
    marginBottom: spacing.sm,
  },
  h1: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.bold,
    color: colors.gray900,
    marginBottom: spacing.sm,
    marginTop: 4,
  },
  h2: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fontFamily.bold,
    color: colors.gray900,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  h3: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamily.semibold,
    color: colors.gray900,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  strong: { fontFamily: fontFamily.semibold },
  em: { fontStyle: 'italic' },
  code: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
  link: {
    color: colors.primary,
    fontFamily: fontFamily.medium,
    textDecorationLine: 'underline',
  },
  denied: {
    fontSize: 13,
    fontStyle: 'italic',
    opacity: 0.9,
    fontFamily: fontFamily.regular,
    color: colors.gray700,
  },
  list: { marginBottom: spacing.sm },
  listItem: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  bullet: {
    width: 18,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fontFamily.regular,
    color: colors.gray700,
  },
  listBody: { flex: 1 },
  spacer: { height: spacing.sm },
})

export { UNVERIFIED_PAGE_MESSAGE }
