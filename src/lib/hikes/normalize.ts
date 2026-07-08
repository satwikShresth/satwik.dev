import type { ActivityKind, OutdoorActivity } from "@/lib/hikes/types"
import { ACTIVITY_CACHE_VERSION } from "@/lib/hikes/types"
import {
  normalizeCalories,
  normalizeMovingTimeMinutes,
} from "@/lib/hikes/format"

type LegacyActivity = Partial<OutdoorActivity> & {
  url?: string
  pauseTimeMinutes?: number | null
}

function normalizeTrackPoint(point: { lat?: number; lng?: number }) {
  const lat = point.lat ?? 0
  const lng = point.lng ?? 0

  return {
    lat: Math.abs(lat) > 90 ? lat / 1e7 : lat,
    lng: Math.abs(lng) > 180 ? lng / 1e7 : lng,
  }
}

export function normalizeActivity(raw: LegacyActivity): OutdoorActivity {
  const kind: ActivityKind =
    raw.kind === "run" || raw.kind === "hike" ? raw.kind : "hike"

  return {
    id: raw.id ?? "",
    name: raw.name ?? "Activity",
    date: raw.date ?? "",
    kind,
    distanceMiles: raw.distanceMiles ?? 0,
    elevationFeet: raw.elevationFeet ?? 0,
    movingTimeMinutes: normalizeMovingTimeMinutes(
      raw.movingTimeMinutes ?? 0,
      raw.distanceMiles ?? 0,
      kind,
      raw.pauseTimeMinutes ?? null,
    ),
    pauseTimeMinutes: raw.pauseTimeMinutes ?? null,
    avgHeartRate: raw.avgHeartRate ?? null,
    maxHeartRate: raw.maxHeartRate ?? null,
    avgCadence: raw.avgCadence ?? null,
    calories: normalizeCalories(raw.calories ?? null),
    imagePath: raw.imagePath ?? null,
    track: Array.isArray(raw.track)
      ? raw.track.map((point) => normalizeTrackPoint(point))
      : [],
  }
}

export function normalizeActivities(raw: LegacyActivity[]): OutdoorActivity[] {
  return raw.map(normalizeActivity)
}

export function normalizeActivityCache(raw: {
  cacheVersion?: number
  syncedAt?: string | null
  hikes?: LegacyActivity[]
  runs?: LegacyActivity[]
}) {
  return {
    cacheVersion: raw.cacheVersion ?? 1,
    syncedAt: raw.syncedAt ?? null,
    hikes: normalizeActivities(raw.hikes ?? []),
    runs: normalizeActivities(raw.runs ?? []),
  }
}

export function isLegacyActivityCache(raw: {
  cacheVersion?: number
  hikes?: LegacyActivity[]
  runs?: LegacyActivity[]
}) {
  if ((raw.cacheVersion ?? 1) < ACTIVITY_CACHE_VERSION) {
    return true
  }

  const all = [...(raw.hikes ?? []), ...(raw.runs ?? [])]

  return all.some((activity) => {
    if (
      !Array.isArray(activity.track) ||
      !("imagePath" in activity) ||
      !("kind" in activity) ||
      !("avgHeartRate" in activity) ||
      !("pauseTimeMinutes" in activity)
    ) {
      return true
    }

    const track = activity.track ?? []
    return track.some(
      (point) =>
        typeof point.lat === "number" &&
        typeof point.lng === "number" &&
        (Math.abs(point.lat) > 90 || Math.abs(point.lng) > 180),
    )
  })
}

/** @deprecated */
export const normalizeHike = normalizeActivity
/** @deprecated */
export const normalizeHikes = normalizeActivities
/** @deprecated */
export const isLegacyHikeCache = isLegacyActivityCache
