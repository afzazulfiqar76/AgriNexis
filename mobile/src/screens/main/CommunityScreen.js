import { StyleSheet, Text, View } from 'react-native'
import { Heart, Trophy } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ScreenContainer } from '../../components/ScreenContainer'
import { COMMUNITY_POSTS } from '../../data/community'
import { ACTIVE_CHALLENGE, LEADERBOARD } from '../../data/communityExtended'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function CommunityScreen() {
  return (
    <ScreenContainer>
      <Header title="Community" subtitle="Connect with urban farmers" />
      <AppCard style={styles.challenge}>
        <Text style={styles.challengeBadge}>Active challenge</Text>
        <Text style={styles.challengeTitle}>{ACTIVE_CHALLENGE.title}</Text>
        <Text style={styles.challengeDesc}>{ACTIVE_CHALLENGE.description}</Text>
        <Text style={styles.challengeMeta}>
          {ACTIVE_CHALLENGE.participants} participants · {ACTIVE_CHALLENGE.prize}
        </Text>
      </AppCard>
      <AppCard style={styles.leaderboard}>
        <View style={styles.lbHead}>
          <Trophy size={20} color={colors.orange500} />
          <Text style={typography.h3}>Leaderboard</Text>
        </View>
        {LEADERBOARD.map((entry) => (
          <View key={entry.rank} style={styles.lbRow}>
            <Text style={styles.rank}>#{entry.rank}</Text>
            <Text style={styles.lbName}>{entry.name}</Text>
            <Text style={styles.points}>{entry.points} pts</Text>
          </View>
        ))}
      </AppCard>
      <Text style={styles.feedTitle}>Community feed</Text>
      {COMMUNITY_POSTS.map((post) => (
        <AppCard key={post.id} style={styles.post}>
          <View style={styles.postHead}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{post.initials}</Text>
            </View>
            <View>
              <Text style={styles.author}>{post.authorName}</Text>
              <Text style={typography.caption}>{post.timeAgo}</Text>
            </View>
          </View>
          <Text style={styles.postBody}>{post.content}</Text>
          <View style={styles.likes}>
            <Heart size={16} color={colors.gray500} />
            <Text style={typography.caption}>{post.likeCount} likes</Text>
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  challenge: { backgroundColor: colors.primary, marginBottom: spacing.md },
  challengeBadge: { fontSize: 11, fontFamily: fontFamily.bold, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', marginBottom: 4 },
  challengeTitle: { fontSize: 18, fontFamily: fontFamily.semibold, color: '#fff' },
  challengeDesc: { fontSize: 13, fontFamily: fontFamily.regular, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  challengeMeta: { marginTop: spacing.sm, fontSize: 13, fontFamily: fontFamily.medium, color: '#fff' },
  leaderboard: { marginBottom: spacing.lg },
  lbHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  lbRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderTopWidth: 1, borderTopColor: colors.gray100 },
  rank: { width: 32, fontFamily: fontFamily.bold, color: colors.primary },
  lbName: { flex: 1, fontFamily: fontFamily.medium, fontSize: 14 },
  points: { fontFamily: fontFamily.semibold, color: colors.gray600, fontSize: 13 },
  feedTitle: { fontSize: 16, fontFamily: fontFamily.bold, marginBottom: spacing.sm },
  post: { marginBottom: spacing.sm },
  postHead: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.emerald100, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fontFamily.bold, color: colors.emerald700 },
  author: { fontFamily: fontFamily.semibold, fontSize: 15 },
  postBody: { fontSize: 14, fontFamily: fontFamily.regular, lineHeight: 22, color: colors.gray700 },
  likes: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
})
