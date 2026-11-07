import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from './AppCard'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'

export function AuthCard({ title, subtitle, children }) {
  return (
    <AppCard padding={spacing.lg} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { width: '100%' },
  header: { marginBottom: spacing.lg, gap: 4 },
  title: { ...typography.h2, fontFamily: fontFamily.bold },
  subtitle: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray500 },
})
