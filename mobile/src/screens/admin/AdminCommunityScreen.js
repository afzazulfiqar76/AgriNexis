import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { INITIAL_ADMIN_POSTS } from '../../data/admin/adminCommunity'
import { ADMIN_PAGE_TITLES } from '../../constants/adminNavigation'
import { ADMIN_ROUTES } from '../../constants/adminRoutes'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const meta = ADMIN_PAGE_TITLES[ADMIN_ROUTES.COMMUNITY]

export function AdminCommunityScreen() {
  const [posts, setPosts] = useState(INITIAL_ADMIN_POSTS)

  const setStatus = (id, status) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      {posts.map((post) => (
        <AppCard key={post.id} style={styles.card} padding={spacing.md}>
          <View style={styles.row}>
            <Text style={styles.author}>{post.author}</Text>
            <StatusBadge status={post.status === 'approved' ? 'active' : post.status} />
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <Text style={styles.meta}>
            Flags: {post.flags} · {post.date}
          </Text>
          <View style={styles.actions}>
            <AppButton title="Approve" variant="outline-emerald" style={styles.btn} onPress={() => setStatus(post.id, 'approved')} />
            <AppButton title="Hide" variant="outline" style={styles.btn} onPress={() => setStatus(post.id, 'hidden')} />
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, alignItems: 'center' },
  author: { flex: 1, fontSize: 15, fontFamily: fontFamily.bold, color: colors.text },
  content: { marginTop: spacing.sm, fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray700, lineHeight: 20 },
  meta: { marginTop: spacing.sm, fontSize: 12, fontFamily: fontFamily.medium, color: colors.gray500 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  btn: { flexGrow: 1 },
})
