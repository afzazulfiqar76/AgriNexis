export const APPROVED_DOMAINS = new Set(['agrinexis.com', 'www.agrinexis.com'])

export const DEV_HOSTS = new Set(['localhost', '127.0.0.1'])

export const APPROVED_STATIC_PATHS = new Set([
  '/',
  '/dashboard',
  '/ai-doctor',
  '/iot-sensors',
  '/community',
  '/documentation',
  '/faqs',
  '/contact',
  '/privacy-policy',
  '/aichat',
  '/signin',
  '/signup',
])

export const DENIED_PATH_PREFIXES = ['/admin']

export const UNVERIFIED_PAGE_MESSAGE =
  "I couldn't verify that page exists on AgriNexis."

function normalizePath(path) {
  let normalized = String(path || '').trim()
  if (!normalized) return '/'
  if (!normalized.startsWith('/')) normalized = `/${normalized}`
  const q = normalized.indexOf('?')
  if (q >= 0) normalized = normalized.slice(0, q)
  const hash = normalized.indexOf('#')
  if (hash >= 0) normalized = normalized.slice(0, hash)
  normalized = normalized.replace(/\/+$/, '') || '/'
  return normalized
}

function isDevHost(host) {
  return DEV_HOSTS.has(host)
}

function isApprovedHost(host) {
  const lower = String(host || '').toLowerCase()
  if (!lower) return false
  if (APPROVED_DOMAINS.has(lower)) return true
  if (import.meta.env.DEV && isDevHost(lower)) return true
  return false
}

function isAgrinexisBrandedHost(host) {
  return String(host || '').toLowerCase().includes('agrinexis')
}

function isBlockedDomain(url) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()
    if (isAgrinexisBrandedHost(host) && !isApprovedHost(host)) {
      return true
    }
  } catch {
    return false
  }
  return false
}

function isDeniedPath(path) {
  const normalized = normalizePath(path)
  return DENIED_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  )
}

export function isInternalPath(href) {
  return typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
}

export function isAllowedInternalPath(href) {
  const normalized = normalizePath(href)
  if (isDeniedPath(normalized)) return false
  return APPROVED_STATIC_PATHS.has(normalized)
}

export function isAgrinexisRelatedUrl(href) {
  if (isInternalPath(href)) return true
  if (!/^https?:\/\//i.test(href)) return false

  try {
    const parsed = new URL(href)
    const host = parsed.hostname.toLowerCase()
    return isAgrinexisBrandedHost(host) || isApprovedHost(host)
  } catch {
    return false
  }
}

export function validateChatLink(href) {
  const url = String(href || '').trim()
  if (!url || url.startsWith('mailto:')) {
    return { allowed: true, href: url }
  }

  if (isBlockedDomain(url)) {
    return { allowed: false, message: UNVERIFIED_PAGE_MESSAGE }
  }

  if (isInternalPath(url)) {
    if (isAllowedInternalPath(url)) {
      return { allowed: true, href: url }
    }
    return { allowed: false, message: UNVERIFIED_PAGE_MESSAGE }
  }

  if (/^https?:\/\//i.test(url) && isAgrinexisRelatedUrl(url)) {
    try {
      const parsed = new URL(url)
      const path = normalizePath(parsed.pathname)
      if (isAllowedInternalPath(path)) {
        return { allowed: true, href: url }
      }
      return { allowed: false, message: UNVERIFIED_PAGE_MESSAGE }
    } catch {
      return { allowed: false, message: UNVERIFIED_PAGE_MESSAGE }
    }
  }

  return { allowed: true, href: url }
}
