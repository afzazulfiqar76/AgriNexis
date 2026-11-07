import { ScrollView, StyleSheet, useWindowDimensions, View, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function AuthLayout({ brandPanel, authPanel, compactBrand = false }) {
  const { width } = useWindowDimensions()
  const isWide = width >= 1024

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            isWide && styles.scrollWide,
            compactBrand && styles.scrollCompact,
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          bounces
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.base200 },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 1.5,
    flexGrow: 1,
  },
  scrollCompact: {
    justifyContent: 'flex-start',
  },
  scrollWide: {
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    padding: spacing.lg,
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', gap: spacing.xl, alignItems: 'center' },
  col: { flex: 1, minWidth: 0 },
})
