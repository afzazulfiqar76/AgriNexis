import { useWindowDimensions } from 'react-native'
import { spacing } from '../constants/spacing'

/** Breakpoints aligned with common Android phone / tablet widths */
export const BREAKPOINTS = {
  sm: 360,
  md: 400,
  lg: 768,
  xl: 1024,
}

export function useLayout() {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const isSmallPhone = width < BREAKPOINTS.sm
  const isPhone = width < BREAKPOINTS.lg
  const isTablet = width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl
  const isWide = width >= BREAKPOINTS.xl

  const columns = width >= BREAKPOINTS.lg ? 3 : 2
  const gap = isSmallPhone ? spacing.sm : spacing.sm
  const horizontalPad = isSmallPhone ? spacing.sm : spacing.md

  /** Half-width card basis for 2-column grids (accounts for gap). */
  const halfCard = isSmallPhone
    ? { flexGrow: 1, flexShrink: 1, flexBasis: '100%', maxWidth: '100%' }
    : {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: columns === 3 ? '30%' : '46%',
        maxWidth: columns === 3 ? '32%' : '100%',
      }

  return {
    width,
    height,
    isLandscape,
    isSmallPhone,
    isPhone,
    isTablet,
    isWide,
    columns,
    gap,
    horizontalPad,
    halfCard,
  }
}

export function initialsFromName(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}
