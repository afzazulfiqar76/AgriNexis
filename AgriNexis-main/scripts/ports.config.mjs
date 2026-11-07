/**
 * AgriNexis fixed local development ports.
 * Web (Vite) 8001 | Expo Metro 8002 | Django API 8003
 */
export const DEV_PORTS = Object.freeze({
  web: 8001,
  mobile: 8002,
  api: 8003,
})

export const DEV_URLS = Object.freeze({
  web: 'http://localhost:8001',
  mobile: 'http://localhost:8002',
  api: 'http://localhost:8003',
})

export const ALL_DEV_PORTS = [DEV_PORTS.web, DEV_PORTS.mobile, DEV_PORTS.api]
