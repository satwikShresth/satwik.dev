import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { env } from "@/env"
import {
  fetchActivitiesFromCoros,
  hasCorosCredentials,
} from "@/lib/coros/client"
import type { ActivityCache, OutdoorActivity } from "@/lib/hikes/types"
import { ACTIVITY_CACHE_VERSION } from "@/lib/hikes/types"
import {
  isLegacyActivityCache,
  normalizeActivityCache,
} from "@/lib/hikes/normalize"

const CACHE_PATH = path.join(process.cwd(), "data", "activities.json")

const EMPTY_CACHE: ActivityCache = {
  cacheVersion: ACTIVITY_CACHE_VERSION,
  syncedAt: null,
  hikes: [],
  runs: [],
  rides: [],
}

let syncInFlight: Promise<ActivityCache> | null = null

function cacheTtlMs() {
  return env.ACTIVITY_CACHE_TTL_HOURS * 60 * 60 * 1000
}

function isFresh(syncedAt: string | null) {
  if (!syncedAt) return false
  return Date.now() - new Date(syncedAt).getTime() < cacheTtlMs()
}

async function ensureCacheDir() {
  await mkdir(path.dirname(CACHE_PATH), { recursive: true })
}

async function parseCacheFile(): Promise<{
  cache: ActivityCache
  legacy: boolean
}> {
  try {
    const raw = await readFile(CACHE_PATH, "utf8")
    const parsed = JSON.parse(raw) as ActivityCache

    return {
      legacy: isLegacyActivityCache(parsed),
      cache: normalizeActivityCache(parsed),
    }
  } catch {
    const legacyPath = path.join(process.cwd(), "data", "hikes.json")
    try {
      const raw = await readFile(legacyPath, "utf8")
      const parsed = JSON.parse(raw) as ActivityCache

      return {
        legacy: true,
        cache: normalizeActivityCache(parsed),
      }
    } catch {
      return { legacy: false, cache: EMPTY_CACHE }
    }
  }
}

export async function readActivityCache(): Promise<ActivityCache> {
  const { cache } = await parseCacheFile()
  return cache
}

export async function writeActivityCache(cache: ActivityCache) {
  await ensureCacheDir()
  await writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8")
}

async function refreshFromCoros(existing: ActivityCache): Promise<ActivityCache> {
  if (!hasCorosCredentials()) {
    return existing
  }

  const { hikes, runs, rides } = await fetchActivitiesFromCoros()
  const cache: ActivityCache = {
    cacheVersion: ACTIVITY_CACHE_VERSION,
    syncedAt: new Date().toISOString(),
    hikes,
    runs,
    rides,
  }

  await writeActivityCache(cache)
  return cache
}

export async function syncActivityCache(force = false): Promise<ActivityCache> {
  const { cache: existing, legacy: needsUpgrade } = await parseCacheFile()

  if (!force && !needsUpgrade && isFresh(existing.syncedAt)) {
    return existing
  }

  if (syncInFlight) {
    return syncInFlight
  }

  syncInFlight = refreshFromCoros(existing).finally(() => {
    syncInFlight = null
  })

  return syncInFlight
}

export async function getActivityLoaderData(): Promise<ActivityCache> {
  const { cache, legacy } = await parseCacheFile()

  if (hasCorosCredentials() && (legacy || !isFresh(cache.syncedAt))) {
    void syncActivityCache().catch((error) => {
      console.error("Background Coros sync failed:", error)
    })
  }

  return cache
}
