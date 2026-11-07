import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  btnBase,
  btnGhost,
  btnGhostText,
  btnOutline,
  btnOutlineEmerald,
  btnOutlineEmeraldText,
  btnPrimary,
  btnPrimaryText,
  btnSecondary,
  btnSecondaryText,
} from '../constants/uiStyles'
import { colors, fontFamily } from '../constants/theme'
import { radius, spacing } from '../constants/spacing'

const VARIANTS = {
  primary: { button: btnPrimary, text: btnPrimaryText },
  secondary: { button: btnSecondary, text: btnSecondaryText },
  outline: { button: btnOutline, text: btnSecondaryText },
  'outline-emerald': { button: btnOutlineEmerald, text: btnOutlineEmeraldText },
  ghost: { button: btnGhost, text: btnGhostText },
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  large = false,
  children,
  accessibilityLabel,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary
  const label = children ?? title

  if (variant === 'gradient') {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.gradientWrap, style]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? (typeof label === 'string' ? label : undefined)}
      >
        <LinearGradient
          colors={[colors.purple600, colors.fuchsia500]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, large && styles.large, (disabled || loading) && styles.disabled]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.row}>
              {icon}
              <Text style={[styles.gradientText, textStyle]} numberOfLines={1}>
                {label}
              </Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    )
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (typeof label === 'string' ? label : undefined)}
      style={({ pressed }) => [
        v.button,
        large && styles.large,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text.color} />
      ) : (
        <View style={styles.row}>
          {icon}
          {typeof label === 'string' ? (
            <Text style={[v.text, textStyle]} numberOfLines={1}>
              {label}
            </Text>
          ) : (
            label
          )}
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, maxWidth: '100%' },
  large: { minHeight: 48 },
  pressed: { opacity: 0.9 },
  disabled: { opacity: 0.5 },
  gradientWrap: { borderRadius: radius.md, overflow: 'hidden' },
  gradient: {
    ...btnBase,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
  },
  gradientText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fontFamily.semibold,
  },
})
