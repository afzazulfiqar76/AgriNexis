#!/usr/bin/env node
/**
 * Free AgriNexis fixed ports (default: 8001, 8002, 8003).
 * Usage:
 *   node scripts/free-ports.mjs
 *   node scripts/free-ports.mjs 8002
 */
import { ALL_DEV_PORTS, freePorts } from './free-ports-lib.mjs'

const args = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const ports = args.length
  ? args.map((a) => Number(a)).filter((n) => Number.isInteger(n) && n > 0)
  : ALL_DEV_PORTS

if (!ports.length) {
  console.error('No valid ports provided.')
  process.exit(1)
}

console.log(`Freeing port(s): ${ports.join(', ')} …`)
const results = freePorts(ports)

for (const { port, freed, wasBusy } of results) {
  if (!wasBusy) {
    console.log(`  · ${port} — already free`)
  } else {
    console.log(`  ✓ ${port} — stopped PID(s): ${freed.join(', ')}`)
  }
}

console.log('Done.')
