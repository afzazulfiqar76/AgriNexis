import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function ScreenContainer({
  children,
  scroll = true,
  style,
  contentStyle,
  edges = ['top', 'left', 'right'],
}) {
  const body = scroll ? (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[styles.content, contentStyle]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      bounces
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.noScroll, contentStyle, style]}>{children}</View>
  )

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      {body}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.base200 },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl + spacing.md,
  },
  noScroll: { flex: 1 },
})
