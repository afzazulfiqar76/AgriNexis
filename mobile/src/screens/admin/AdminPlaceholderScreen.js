import { StyleSheet, Text } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { ChartPlaceholder } from '../../components/admin/ChartPlaceholder'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function AdminPlaceholderScreen({ title, subtitle, description }) {
  return (
    <ScreenContainer>
      <AdminPageHeader title={title} subtitle={subtitle} />
      <AppCard>
        <Text style={styles.body}>{description}</Text>
      </AppCard>
      <ChartPlaceholder title="Analytics preview" />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  body: { fontSize: 15, fontFamily: fontFamily.regular, color: colors.gray600, lineHeight: 24 },
})
