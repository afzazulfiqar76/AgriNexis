import { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { InputField } from '../../components/InputField'
import { ScreenContainer } from '../../components/ScreenContainer'
import { FAQ_CATEGORIES, FAQ_ITEMS, FAQ_PAGE } from '../../data/faqContent'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function FaqsScreen() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQ_ITEMS.filter((item) => {
      const catOk = category === 'all' || item.category === category
      const searchOk =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      return catOk && searchOk
    })
  }, [query, category])

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']}>
      <Text style={styles.label}>{FAQ_PAGE.label}</Text>
      <Text style={styles.title}>{FAQ_PAGE.title}</Text>
      <Text style={styles.sub}>{FAQ_PAGE.subtitle}</Text>
      <InputField
        label="Search"
        value={query}
        onChangeText={setQuery}
        placeholder="Search questions…"
      />
      <View style={styles.tabs}>
        {FAQ_CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            style={[styles.tab, category === cat.id && styles.tabActive]}
            onPress={() => setCategory(cat.id)}
          >
            <Text style={[styles.tabText, category === cat.id && styles.tabTextActive]}>{cat.label}</Text>
          </Pressable>
        ))}
      </View>
      {filtered.map((item) => {
        const open = openId === item.id
        return (
          <Pressable key={item.id} onPress={() => setOpenId(open ? null : item.id)}>
            <AppCard style={styles.faq}>
              <View style={styles.faqHead}>
                <Text style={styles.question}>{item.question}</Text>
                <ChevronDown
                  size={20}
                  color={colors.gray500}
                  style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
                />
              </View>
              {open ? <Text style={styles.answer}>{item.answer}</Text> : null}
            </AppCard>
          </Pressable>
        )
      })}
      {filtered.length === 0 ? (
        <Text style={styles.empty}>No questions match your search.</Text>
      ) : null}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  label: { fontSize: 12, fontFamily: fontFamily.bold, color: colors.primary, textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center' },
  title: { fontSize: 26, fontFamily: fontFamily.bold, textAlign: 'center', marginTop: spacing.sm },
  sub: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600, textAlign: 'center', marginBottom: spacing.lg, marginTop: 4 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  tab: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: colors.gray100 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.gray600 },
  tabTextActive: { color: '#fff' },
  faq: { marginBottom: spacing.sm },
  faqHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  question: { flex: 1, fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text },
  answer: { marginTop: spacing.sm, fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600, lineHeight: 22 },
  empty: { textAlign: 'center', color: colors.gray500, fontFamily: fontFamily.regular, marginTop: spacing.lg },
})
