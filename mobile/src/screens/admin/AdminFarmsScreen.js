import { useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ProgressBar } from '../../components/ProgressBar'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { INITIAL_ADMIN_FARMS } from '../../data/admin/adminFarms'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.FARMS]

export function AdminFarmsScreen() {
  const [query, setQuery] = useState('')
  const farms = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INITIAL_ADMIN_FARMS
    return INITIAL_ADMIN_FARMS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.owner.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <InputField label="Search farms" value={query} onChangeText={setQuery} placeholder="Name, owner, location…" />
      {farms.map((farm) => (
        <AppCard key={farm.id} style={styles.card} padding={spacing.md}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {farm.name}
            </Text>
            <StatusBadge status={farm.status} />
          </View>
          <Text style={styles.meta} numberOfLines={1}>
            {farm.owner} · {farm.location}
          </Text>
          <Text style={styles.meta}>{farm.plantCount} plants</Text>
          <Text style={styles.healthLabel}>Health {farm.healthScore}%</Text>
          <ProgressBar value={farm.healthScore} fillColor={colors.primary} />
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, alignItems: 'center' },
  name: { flex: 1, fontSize: 16, fontFamily: fontFamily.bold, color: colors.text },
  meta: { marginTop: 4, fontSize: 13, fontFamily: fontFamily.regular, color: colors.gray500 },
  healthLabel: {
    marginTop: spacing.sm,
    marginBottom: 4,
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
  },
})
