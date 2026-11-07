import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily, typography } from '../constants/theme'
import { spacing } from '../constants/spacing'
import {
  FOOTER_BRAND,
  FOOTER_CONTACT,
  FOOTER_CREDITS,
  FOOTER_QUICK_LINKS,
  FOOTER_RESOURCES,
} from '../constants/footer'

export function SiteFooter({ onNavigate }) {
  return (
    <View style={styles.footer}>
      <View style={styles.accent} />
      <View style={styles.inner}>
        <Text style={styles.brandTitle}>AgriNexis</Text>
        <Text style={styles.brandDesc}>{FOOTER_BRAND.description}</Text>
        <FooterColumn title={FOOTER_QUICK_LINKS.title} links={FOOTER_QUICK_LINKS.links} onNavigate={onNavigate} />
        <FooterColumn title={FOOTER_RESOURCES.title} links={FOOTER_RESOURCES.links} onNavigate={onNavigate} />
        <Text style={typography.footerHeading}>{FOOTER_CONTACT.title}</Text>
        <Text style={styles.linkText}>{FOOTER_CONTACT.email}</Text>
        <Text style={styles.linkText}>{FOOTER_CONTACT.location}</Text>
        <Text style={styles.credits}>{FOOTER_CREDITS.text}</Text>
      </View>
    </View>
  )
}

function FooterColumn({ title, links, onNavigate }) {
  return (
    <View style={styles.column}>
      <Text style={typography.footerHeading}>{title}</Text>
      {links.map((link) => (
        <Pressable key={link.label} onPress={() => onNavigate?.(link.route)}>
          <Text style={styles.linkText}>{link.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: { backgroundColor: colors.footer, marginTop: spacing.xl },
  accent: { height: 1, backgroundColor: 'rgba(16, 185, 129, 0.4)' },
  inner: { padding: spacing.lg, gap: spacing.sm },
  brandTitle: { fontSize: 18, fontFamily: fontFamily.bold, color: '#fff' },
  brandDesc: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.slate400, lineHeight: 22, marginBottom: spacing.md },
  column: { marginTop: spacing.md, gap: 6 },
  linkText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.slate400, paddingVertical: 2 },
  credits: { marginTop: spacing.lg, fontSize: 13, fontFamily: fontFamily.regular, color: colors.slate400, opacity: 0.9 },
})
