export function splitFullName(fullName) {
  const parts = (fullName ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: '—', lastName: '—' }
  if (parts.length === 1) return { firstName: parts[0], lastName: '—' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

export function joinFullName(firstName, lastName) {
  const first = (firstName ?? '').trim()
  const last = (lastName ?? '').trim()
  if (!first && !last) return ''
  if (!last || last === '—') return first
  return `${first} ${last}`.trim()
}
