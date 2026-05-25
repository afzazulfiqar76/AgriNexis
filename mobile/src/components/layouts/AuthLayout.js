import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function AuthLayout({ brandPanel, authPanel }) {
  const { width } = useWindowDimensions()
  const isWide = width >= 1024

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[styles.scroll, isWide && styles.scrollWide]}
        keyboardShouldPersistTaps="handled"
      >
        {isWide ? (
          <View style={styles.row}>
            <View style={styles.col}>{brandPanel}</View>
            <View style={styles.col}>{authPanel}</View>
          </View>
        ) : (
          <>
            {brandPanel}
            {authPanel}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.base200 },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xl, flexGrow: 1, justifyContent: 'center' },
  scrollWide: { maxWidth: 1100, alignSelf: 'center', width: '100%' },
  row: { flexDirection: 'row', gap: spacing.xl, alignItems: 'center' },
  col: { flex: 1 },
})
