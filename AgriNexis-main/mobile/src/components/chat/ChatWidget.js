import { Image, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { X } from 'lucide-react-native'
import { useChatWidget } from '../../context/ChatWidgetContext'
import { CHATBOT_NAME } from '../../utils/chatWelcome'
import { ChatPanel } from './ChatPanel'
import { colors } from '../../constants/theme'
import { spacing, touchTarget } from '../../constants/spacing'

/**
 * Floating chat FAB + panel (web ChatWidget parity).
 * @param {{ hidden?: boolean, navigationRef?: object, liftForTabs?: boolean }} props
 */
export function ChatWidget({ hidden = false, navigationRef, liftForTabs = false }) {
  const insets = useSafeAreaInsets()
  const { height: winH, width: winW } = useWindowDimensions()
  const { isOpen, openChat, closeChat, toggleChat } = useChatWidget()

  if (hidden) return null

  const bottomPad = Math.max(insets.bottom, spacing.md)
  const fabBottom = liftForTabs ? bottomPad + 56 : bottomPad
  const rightPad = Math.max(insets.right, spacing.md)
  const panelHeight = Math.min(650, Math.round(winH * 0.71))
  const panelWidth = Math.min(winW - spacing.md * 1.5, 400)

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {isOpen ? (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          <Pressable
            style={styles.backdrop}
            onPress={closeChat}
            accessibilityLabel="Dismiss chat"
          />
          <View
            pointerEvents="box-none"
            style={[
              styles.panelAnchor,
              {
                bottom: fabBottom + touchTarget + spacing.sm,
                right: rightPad,
                width: panelWidth,
                height: panelHeight,
              },
            ]}
          >
            <ChatPanel
              onClose={closeChat}
              navigationRef={navigationRef}
              openChat={openChat}
            />
          </View>
        </View>
      ) : null}

      <View style={[styles.fabWrap, { bottom: fabBottom, right: rightPad }]}>
        <Pressable
          onPress={toggleChat}
          style={[styles.fab, isOpen && styles.fabOpen]}
          accessibilityRole="button"
          accessibilityLabel={isOpen ? 'Close chat' : `Open ${CHATBOT_NAME}`}
        >
          {isOpen ? (
            <X size={24} color="#fff" strokeWidth={2} />
          ) : (
            <Image
              source={require('../../../assets/chatbot_icon.png')}
              style={styles.fabIcon}
              accessibilityIgnoresInvertColors
            />
          )}
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  panelAnchor: {
    position: 'absolute',
    zIndex: 10000,
  },
  fabWrap: {
    position: 'absolute',
    zIndex: 10001,
    elevation: 10001,
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabOpen: {
    width: touchTarget + 4,
    height: touchTarget + 4,
    borderRadius: 999,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    width: 76,
    height: 76,
    resizeMode: 'contain',
  },
})
