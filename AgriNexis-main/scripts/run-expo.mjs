#!/usr/bin/env node
/**
 * Start Expo Metro on fixed port 8002 after freeing stale listeners.
 * Never silently falls back to 8003 (Django API).
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { freePort, isPortInUse } from './free-ports-lib.mjs'
import { DEV_PORTS, DEV_URLS } from './ports.config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MOBILE = path.join(ROOT, 'mobile')
const PORT = DEV_PORTS.mobile

const extraArgs = process.argv.slice(2)

const result = freePort(PORT)
if (result.wasBusy) {
  console.log(`Freed Expo port ${PORT} (PID ${result.freed.join(', ')})`)
}

if (isPortInUse(PORT)) {
  console.error(
    `Port ${PORT} is still in use. Run: npm run free-ports\n` +
      `Do NOT accept Expo's offer to use port ${DEV_PORTS.api} (that is the Django API).`,
  )
  process.exit(1)
}

const expoArgs = ['expo', 'start', '--port', String(PORT), ...extraArgs]

const child = spawn('npx', expoArgs, {
  cwd: MOBILE,
  shell: true,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: String(PORT),
    RCT_METRO_PORT: String(PORT),
    EXPO_NO_TELEMETRY: '1',
  },
})

child.on('exit', (code, signal) => {
  if (signal) process.exit(1)
  process.exit(code ?? 0)
})

console.log(`Expo Metro → ${DEV_URLS.mobile} (port ${PORT})`)
