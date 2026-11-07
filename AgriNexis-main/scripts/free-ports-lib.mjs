/**
 * Free AgriNexis development ports by stopping listeners only.
 * Safe for repeated restarts (clears stale Metro / Vite / Django).
 */
import { execFileSync, spawnSync } from 'node:child_process'
import process from 'node:process'
import { ALL_DEV_PORTS, DEV_PORTS } from './ports.config.mjs'

const isWin = process.platform === 'win32'

function unique(nums) {
  return [...new Set(nums.filter((n) => Number.isInteger(n) && n > 0))]
}

function listeningPidsWindows(port) {
  let out = ''
  try {
    out = execFileSync('netstat', ['-ano', '-p', 'tcp'], {
      encoding: 'utf8',
      windowsHide: true,
    })
  } catch {
    return []
  }

  const pids = new Set()
  const needle = `:${port}`
  for (const line of out.split(/\r?\n/)) {
    if (!/LISTENING/i.test(line)) continue
    if (!line.includes(needle)) continue
    // Match ":8002" as a local port boundary (avoid :80020)
    const localMatch = line.match(/^\s*TCP\s+(\S+):(\d+)\s+/i)
    if (!localMatch || Number(localMatch[2]) !== port) continue
    const parts = line.trim().split(/\s+/)
    const pid = Number(parts[parts.length - 1])
    if (pid > 0 && pid !== process.pid) pids.add(pid)
  }
  return [...pids]
}

function listeningPidsUnix(port) {
  try {
    const out = execFileSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'], {
      encoding: 'utf8',
    })
    return unique(
      out
        .split(/\s+/)
        .map((s) => Number(s.trim()))
        .filter((n) => n > 0 && n !== process.pid),
    )
  } catch {
    return []
  }
}

export function getListeningPids(port) {
  return isWin ? listeningPidsWindows(port) : listeningPidsUnix(port)
}

export function isPortInUse(port) {
  return getListeningPids(port).length > 0
}

function killPid(pid) {
  if (isWin) {
    spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
      stdio: 'ignore',
      windowsHide: true,
    })
  } else {
    try {
      process.kill(pid, 'SIGTERM')
    } catch {
      /* already gone */
    }
    try {
      process.kill(pid, 'SIGKILL')
    } catch {
      /* already gone */
    }
  }
}

function sleepSync(ms) {
  const end = Date.now() + ms
  while (Date.now() < end) {
    /* settle sockets after taskkill on Windows */
  }
}

/**
 * @param {number[]} ports
 * @returns {{ port: number, freed: number[], wasBusy: boolean }[]}
 */
export function freePorts(ports = ALL_DEV_PORTS) {
  const results = []
  for (const port of unique(ports)) {
    const pids = getListeningPids(port)
    for (const pid of pids) {
      killPid(pid)
    }
    if (pids.length && isWin) {
      sleepSync(450)
    }
    const still = getListeningPids(port)
    if (still.length) {
      for (const pid of still) killPid(pid)
    }
    results.push({ port, freed: pids, wasBusy: pids.length > 0 })
  }
  return results
}

export function freeDevPorts() {
  return freePorts(ALL_DEV_PORTS)
}

export function freePort(port) {
  return freePorts([port])[0]
}

export { DEV_PORTS, ALL_DEV_PORTS }
