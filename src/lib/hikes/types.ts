export type ActivityTrackPoint = {
  lat: number
  lng: number
}

export type ActivityKind = "hike" | "run" | "ride"

export type OutdoorActivity = {
  id: string
  name: string
  date: string
  kind: ActivityKind
  distanceMiles: number
  elevationFeet: number
  movingTimeMinutes: number
  pauseTimeMinutes: number | null
  avgHeartRate: number | null
  maxHeartRate: number | null
  avgCadence: number | null
  calories: number | null
  track: ActivityTrackPoint[]
}

export type ActivityCache = {
  cacheVersion: number
  syncedAt: string | null
  hikes: OutdoorActivity[]
  runs: OutdoorActivity[]
  rides: OutdoorActivity[]
}

export const ACTIVITY_CACHE_VERSION = 6
