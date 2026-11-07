import { colors, fontFamily, shadows } from './theme'
import { radius, spacing } from './spacing'

export const cardSurface = {
  backgroundColor: colors.base100,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.borderLight,
  ...shadows.card,
}

export const panelSurface = {
  ...cardSurface,
  overflow: 'hidden',
}

export const btnBase = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  borderRadius: radius.md,
  minHeight: 44,
  paddingHorizontal: spacing.lg,
}

export const btnPrimary = {
  ...btnBase,
  backgroundColor: colors.primary,
  borderWidth: 1,
  borderColor: 'rgba(0, 163, 108, 0.2)',
  ...shadows.primaryBtn,
}

export const btnPrimaryText = {
  color: colors.primaryContent,
  fontSize: 15,
  fontFamily: fontFamily.semibold,
}

export const btnSecondary = {
  ...btnBase,
  backgroundColor: colors.base100,
  borderWidth: 1,
  borderColor: colors.gray200,
  ...shadows.cardSoft,
}

export const btnSecondaryText = {
  color: colors.gray700,
  fontSize: 14,
  fontFamily: fontFamily.medium,
}

export const btnOutline = {
  ...btnSecondary,
}

export const btnOutlineEmerald = {
  ...btnBase,
  backgroundColor: colors.base100,
  borderWidth: 1,
  borderColor: 'rgba(167, 243, 208, 0.9)',
}

export const btnOutlineEmeraldText = {
  color: colors.emerald700,
  fontSize: 14,
  fontFamily: fontFamily.semibold,
}

export const btnGhost = {
  ...btnBase,
  backgroundColor: 'transparent',
  minHeight: 40,
}

export const btnGhostText = {
  color: colors.gray600,
  fontSize: 14,
  fontFamily: fontFamily.medium,
}

export const progressTrack = {
  height: 8,
  borderRadius: radius.full,
  backgroundColor: colors.gray200,
  overflow: 'hidden',
}

export const inputSurface = {
  backgroundColor: colors.base300,
  borderRadius: radius.md,
  paddingHorizontal: spacing.md,
  paddingVertical: 12,
  fontSize: 14,
  fontFamily: fontFamily.regular,
  color: colors.text,
  borderWidth: 2,
  borderColor: 'transparent',
  minHeight: 48,
}

export const inputFocused = {
  borderColor: 'rgba(0, 163, 108, 0.3)',
}

export const inputError = {
  borderColor: 'rgba(248, 113, 113, 0.5)',
}

export const navItemActive = {
  backgroundColor: colors.slate900,
  borderRadius: radius.full,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
}

export const navItemIdle = {
  borderRadius: radius.full,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
}

export const footerPanel = {
  backgroundColor: colors.footer,
}

export const adminNavActive = {
  backgroundColor: 'rgba(0, 163, 108, 0.1)',
  borderRadius: radius.md,
}
