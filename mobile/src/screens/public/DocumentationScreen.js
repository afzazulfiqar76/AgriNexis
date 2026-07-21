import { useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ScreenContainer } from '../../components/ScreenContainer'
import { DOCUMENTATION_PAGE, DOCUMENTATION_SECTIONS } from '../../data/documentationContent'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function DocumentationScreen() {
  const [query, setQuery] = useState('')

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DOCUMENTATION_SECTIONS
    return DOCUMENTATION_SECTIONS.filter((s) => {
      const hay = [s.title, s.summary, ...(s.paragraphs ?? []), ...(s.bullets ?? [])]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query])

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <Text style={styles.label}>{DOCUMENTATION_PAGE.label}</Text>
      <Text style={styles.title}>{DOCUMENTATION_PAGE.title}</Text>
      <Text style={styles.sub}>{DOCUMENTATION_PAGE.subtitle}</Text>
      <InputField
        label="Search"
        value={query}
        onChangeText={setQuery}
        placeholder={DOCUMENTATION_PAGE.searchPlaceholder}
      />
      {sections.length === 0 ? (
        <Text style={styles.empty}>{DOCUMENTATION_PAGE.emptySearch}</Text>
      ) : (
        sections.map((section) => (
          <AppCard key={section.id} style={styles.card} padding={spacing.md}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            {section.summary ? <Text style={styles.summary}>{section.summary}</Text> : null}
            {(section.paragraphs ?? []).map((p) => (
              <Text key={p.slice(0, 24)} style={styles.paragraph}>
                {p}
              </Text>
            ))}
            {(section.bullets ?? []).map((b) => (
              <Text key={b} style={styles.bullet}>
                • {b}
              </Text>
            ))}
            {(section.highlights ?? []).map((h) => (
              <View key={h.title} style={styles.highlight}>
                <Text style={styles.highlightTitle}>{h.title}</Text>
                <Text style={styles.highlightText}>{h.text}</Text>
              </View>
            ))}
          </AppCard>
        ))
      )}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: { fontSize: 26, fontFamily: fontFamily.bold, marginTop: spacing.sm },
  sub: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    marginBottom: spacing.md,
    marginTop: 4,
    lineHeight: 22,
  },
  empty: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray500,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  card: { marginBottom: spacing.sm },
  cardTitle: { fontSize: 18, fontFamily: fontFamily.bold, marginBottom: spacing.sm },
  summary: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray600,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray700,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray700,
    lineHeight: 22,
    marginBottom: 4,
    paddingLeft: 2,
  },
  highlight: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.base200,
  },
  highlightTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    lineHeight: 20,
  },
})
