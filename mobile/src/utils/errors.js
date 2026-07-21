export function getErrorMessage(error) {
  const msg = error?.message ?? ''
  if (
    error?.code === 'ECONNABORTED' ||
    msg.includes('timeout') ||
    error?.code === 'ERR_NETWORK'
  ) {
    return (
      'Cannot reach the API server. On your PC run: python manage.py runserver 0.0.0.0:8003 ' +
      '(not just runserver 8003). Use your Wi‑Fi IP in mobile/.env and allow port 8003 in Windows Firewall.'
    )
  }
  const data = error?.response?.data
  if (!data) return msg || 'Something went wrong'
  if (typeof data.detail === 'string') return data.detail
  if (typeof data.message === 'string') return data.message
  const first = Object.values(data).flat().find((v) => typeof v === 'string')
  return first ?? 'Request failed'
}
