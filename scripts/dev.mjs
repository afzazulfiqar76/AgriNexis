#!/usr/bin/env node
/**
 * Start AgriNexis local stack on fixed ports after freeing stale listeners.
 *
 *   node scripts/dev.mjs              # api + web + mobile
 *   node scripts/dev.mjs --api --web  # subset
 *   node scripts/dev.mjs --free-only
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { freePorts } from './free-ports-lib.mjs'
import { DEV_PORTS, DEV_URLS } from './ports.config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const flags = new Set(process.argv.slice(2))
const freeOnly = flags.has('--free-only')
const explicit = flags.has('--api') || flags.has('--web') || flags.has('--mobile')

const runApi = freeOnly ? false : explicit ? flags.has('--api') : true
const runWeb = freeOnly ? false : explicit ? flags.has('--web') : true
const runMobile = freeOnly ? false : explicit ? flags.has('--mobile') : true

const portsToFree = new Set()
if (freeOnly || runApi) portsToFree.add(DEV_PORTS.api)
if (freeOnly || runWeb) portsToFree.add(DEV_PORTS.web)
if (freeOnly || runMobile) portsToFree.add(DEV_PORTS.mobile)
if (freeOnly) {
  portsToFree.add(DEV_PORTS.web)
  portsToFree.add(DEV_PORTS.mobile)
  portsToFree.add(DEV_PORTS.api)
}

function printSummary(rows) {
  console.log('')
  console.log('══════════════════════════════════════════')
  console.log('  AgriNexis development ports')
  console.log('══════════════════════════════════════════')
  for (const row of rows) {
    console.log(`  ✓ ${row.label.padEnd(12)} → ${row.url}`)
  }
  console.log('══════════════════════════════════════════')
  console.log('  Fixed: Web 8001 | Expo 8002 | API 8003')
  console.log('  Tip:  npm run free-ports')
  console.log('══════════════════════════════════════════')
  console.log('')
}

function spawnService(label, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: String(DEV_PORTS.mobile),
      RCT_METRO_PORT: String(DEV_PORTS.mobile),
    },
  })
  child.on('exit', (code, signal) => {
    if (signal) console.log(`[${label}] stopped (${signal})`)
    else if (code && code !== 0) console.log(`[${label}] exited with code ${code}`)
  })
  return child
}

const uniquePorts = [...portsToFree]
console.log(`Checking / freeing ports: ${uniquePorts.join(', ')} …`)
for (const { port, freed, wasBusy } of freePorts(uniquePorts)) {
  if (wasBusy) console.log(`  ✓ Freed :${port} (PID ${freed.join(', ')})`)
  else console.log(`  · Port :${port} free`)
}

if (freeOnly) {
  printSummary([
    { label: 'Web Client', url: DEV_URLS.web },
    { label: 'Expo Metro', url: DEV_URLS.mobile },
    { label: 'Django API', url: DEV_URLS.api },
  ])
  process.exit(0)
}

const children = []
const started = []

if (runApi) {
  children.push(
    spawnService(
      'api',
      'python',
      ['manage.py', 'runserver', `0.0.0.0:${DEV_PORTS.api}`],
      path.join(ROOT, 'server'),
    ),
  )
  started.push({ label: 'Django API', url: DEV_URLS.api })
}
if (runWeb) {
  // Use vite directly to avoid predev double-free race with sibling services
  children.push(
    spawnService(
      'web',
      'npx',
      ['vite', '--host', 'localhost', '--port', String(DEV_PORTS.web), '--strictPort'],
      path.join(ROOT, 'client'),
    ),
  )
  started.push({ label: 'Web Client', url: DEV_URLS.web })
}
if (runMobile) {
  children.push(
    spawnService('mobile', 'node', [path.join(ROOT, 'scripts', 'run-expo.mjs'), '--go'], ROOT),
  )
  started.push({ label: 'Expo Metro', url: DEV_URLS.mobile })
}

printSummary(started)

function shutdown() {
  for (const child of children) {
    if (!child.killed) {
      try {
        child.kill('SIGTERM')
      } catch {
        /* ignore */
      }
    }
  }
  setTimeout(() => {
    freePorts(uniquePorts)
    process.exit(0)
  }, 500)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
