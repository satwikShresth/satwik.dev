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

const CACHE_PATH = path.join(process.cwd(), "data", "hikes.json")

const EMPTY_CACHE: ActivityCache = {
  cacheVersion: ACTIVITY_CACHE_VERSION,
  syncedAt: null,
  hikes: [],
  runs: [],
}

let syncInFlight: Promise<ActivityCache> | null = null

function cacheTtlMs() {
  return env.HIKE_CACHE_TTL_HOURS * 60 * 60 * 1000
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
    const parsed = JSON.parse(raw) as ActivityCache & { hikes?: OutdoorActivity[] }

    return {
      legacy: isLegacyActivityCache(parsed),
      cache: normalizeActivityCache(parsed),
    }
  } catch {
    return { legacy: false, cache: EMPTY_CACHE }
  }
}

export async function readActivityCache(): Promise<ActivityCache> {
  const { cache } = await parseCacheFile()
  return cache
}

/** @deprecated */
export const readHikeCache = readActivityCache

export async function writeActivityCache(cache: ActivityCache) {
  await ensureCacheDir()
  await writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8")
}

async function refreshFromCoros(existing: ActivityCache): Promise<ActivityCache> {
  if (!hasCorosCredentials()) {
    return existing
  }

  const { hikes, runs } = await fetchActivitiesFromCoros()
  const cache: ActivityCache = {
    cacheVersion: ACTIVITY_CACHE_VERSION,
    syncedAt: new Date().toISOString(),
    hikes,
    runs,
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

/** @deprecated */
export const syncHikeCache = syncActivityCache

export async function getActivityLoaderData(): Promise<ActivityCache> {
  const { cache, legacy } = await parseCacheFile()

  if (hasCorosCredentials() && (legacy || !isFresh(cache.syncedAt))) {
    void syncActivityCache().catch((error) => {
      console.error("Background Coros sync failed:", error)
    })
  }

  return cache
}

export async function getOffTheClockActivities(): Promise<ActivityCache> {
  if (!hasCorosCredentials()) {
    console.warn("COROS_EMAIL and COROS_PASSWORD are not set — skipping sync")
    return readActivityCache()
  }

  try {
    return await syncActivityCache()
  } catch (error) {
    console.error("Failed to sync Coros activities:", error)
    return readActivityCache()
  }
}

/** @deprecated */
export async function getHikeActivities(): Promise<OutdoorActivity[]> {
  const cache = await getOffTheClockActivities()
  return cache.hikes
}
