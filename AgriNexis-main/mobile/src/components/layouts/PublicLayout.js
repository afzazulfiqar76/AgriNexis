import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Menu } from 'lucide-react-native'
import { AgriNexisLogo } from '../AgriNexisLogo'
import { SiteFooter } from '../SiteFooter'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function PublicLayout({ children, navigation, title }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <AgriNexisLogo size={40} />
          <Text style={styles.brandText}>AgriNexis</Text>
        </View>
        {navigation ? (
          <Pressable onPress={() => navigation.navigate('PublicMenu')} hitSlop={8}>
            <Menu size={24} color={colors.text} />
          </Pressable>
        ) : null}
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {children}
        <SiteFooter onNavigate={(route) => navigation?.navigate(route)} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.base200 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.base100,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  brandText: { fontSize: 16, fontFamily: fontFamily.bold, color: colors.emerald800 },
  scroll: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
})
