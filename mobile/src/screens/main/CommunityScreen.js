import { StyleSheet, Text, View } from 'react-native'
import { Heart, Trophy } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ProgressBar } from '../../components/ProgressBar'
import { ScreenContainer } from '../../components/ScreenContainer'
import { COMMUNITY_POSTS } from '../../data/communityPosts'
import { ACTIVE_CHALLENGE } from '../../data/activeChallenge'
import { LEADERBOARD } from '../../data/communityLeaderboard'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function CommunityScreen() {
  const challenge = ACTIVE_CHALLENGE

  return (
    <ScreenContainer>
      <Header title="Community" subtitle="Connect with urban farmers" />

      <AppCard style={styles.challenge} padding={spacing.md}>
        <Text style={styles.challengeBadge}>Active challenge</Text>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeDesc}>{challenge.description}</Text>
        <Text style={styles.challengeMeta}>
          {challenge.savedLiters}/{challenge.targetLiters}L saved · {challenge.participants} participants ·{' '}
          {challenge.prize}
        </Text>
        <View style={styles.progressWrap}>
          <ProgressBar value={challenge.progress} fillColor={colors.primary} />
          <Text style={styles.progressLabel}>{challenge.progress}% complete</Text>
        </View>
      </AppCard>

      <AppCard style={styles.leaderboard} padding={spacing.md}>
        <View style={styles.lbHead}>
          <Trophy size={20} color={colors.orange500} />
          <Text style={typography.h3}>Leaderboard</Text>
        </View>
        {LEADERBOARD.map((entry) => (
          <View key={entry.id ?? entry.rank} style={[styles.lbRow, entry.isCurrentUser && styles.lbYou]}>
            <Text style={styles.rank}>#{entry.rank}</Text>
            <Text style={styles.lbName} numberOfLines={1}>
              {entry.name}
            </Text>
            <Text style={styles.points}>{entry.points} pts</Text>
          </View>
        ))}
      </AppCard>

      <Text style={styles.feedTitle}>Community feed</Text>
      {COMMUNITY_POSTS.map((post) => (
        <AppCard key={post.id} style={styles.post} padding={spacing.md}>
          <View style={styles.postHead}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{post.initials}</Text>
            </View>
            <View style={styles.postMeta}>
              <Text style={styles.author}>{post.authorName}</Text>
              <Text style={typography.caption}>{post.timeAgo}</Text>
            </View>
          </View>
          <Text style={styles.postBody}>{post.content}</Text>
          <View style={styles.likes}>
            <Heart size={16} color={colors.gray500} />
            <Text style={styles.likeCount}>{post.likeCount}</Text>
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  challenge: { marginBottom: spacing.md, backgroundColor: '#ecfdf5' },
  challengeBadge: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  challengeTitle: { fontSize: 18, fontFamily: fontFamily.bold, color: colors.text },
  challengeDesc: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    lineHeight: 20,
  },
  challengeMeta: {
    marginTop: spacing.sm,
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
  },
  progressWrap: { marginTop: spacing.md },
  progressLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    textAlign: 'right',
  },
  leaderboard: { marginBottom: spacing.md },
  lbHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  lbYou: { backgroundColor: 'rgba(0,163,108,0.06)', marginHorizontal: -spacing.md, paddingHorizontal: spacing.md },
  rank: { width: 36, fontSize: 14, fontFamily: fontFamily.bold, color: colors.gray500 },
  lbName: { flex: 1, fontSize: 14, fontFamily: fontFamily.medium, color: colors.text },
  points: { fontSize: 13, fontFamily: fontFamily.semibold, color: colors.primary },
  feedTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  post: { marginBottom: spacing.sm },
  postHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.emerald100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: fontFamily.bold, color: colors.emerald700 },
  postMeta: { flex: 1, minWidth: 0 },
  author: { fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text },
  postBody: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray700, lineHeight: 22 },
  likes: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  likeCount: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.gray500 },
})
