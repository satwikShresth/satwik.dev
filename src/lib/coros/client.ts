import path from "node:path"
import { rm } from "node:fs/promises"
import {
  type Activity,
  CorosApi,
  isDirectory,
} from "@nyt87/crs-connect"
import { env } from "@/env"
import { saveHikeImage } from "@/lib/coros/images"
import {
  corosMovingSeconds,
  corosTimeToMinutes,
  normalizeCalories,
} from "@/lib/hikes/format"
import type {
  ActivityKind,
  ActivityTrackPoint,
  OutdoorActivity,
} from "@/lib/hikes/types"

const MAX_HIKES = 3
const MAX_RUNS = 3
const MAX_RIDES = 3
const MAX_PAGES = 6
const MAX_TRACK_POINTS = 80
const HIKE_SPORT_TYPE = 104
const RUN_SPORT_TYPES = new Set([100, 101, 102, 103])
const RIDE_SPORT_TYPES = new Set([200, 299, 201, 202, 203, 204, 205])
const TOKEN_DIR = path.join(process.cwd(), "data", "coros-token")

export type CorosActivities = {
  hikes: OutdoorActivity[]
  runs: OutdoorActivity[]
  rides: OutdoorActivity[]
}

function hasCredentials() {
  return Boolean(env.COROS_EMAIL && env.COROS_PASSWORD)
}

function metersToMiles(meters: number) {
  return meters / 1609.344
}

function metersToFeet(meters: number) {
  return meters * 3.28084
}

function timestampToDate(timestamp: number) {
  const ms = timestamp > 1e12 ? timestamp : timestamp * 1000
  return new Date(ms).toISOString().slice(0, 10)
}

function activityKind(sportType: number): ActivityKind | null {
  if (sportType === HIKE_SPORT_TYPE) return "hike"
  if (RUN_SPORT_TYPES.has(sportType)) return "run"
  if (RIDE_SPORT_TYPES.has(sportType)) return "ride"
  return null
}

function normalizeCoordinate(value: number) {
  return Math.abs(value) > 180 ? value / 1e7 : value
}

function simplifyTrack(
  points: Array<{ gpsLat?: number; gpsLon?: number }>,
): ActivityTrackPoint[] {
  const valid = points.filter(
    (point) =>
      typeof point.gpsLat === "number" &&
      typeof point.gpsLon === "number" &&
      point.gpsLat !== 0 &&
      point.gpsLon !== 0,
  )

  if (valid.length === 0) return []

  const step = Math.max(1, Math.ceil(valid.length / MAX_TRACK_POINTS))

  return valid
    .filter((_, index) => index % step === 0)
    .map((point) => ({
      lat: normalizeCoordinate(point.gpsLat!),
      lng: normalizeCoordinate(point.gpsLon!),
    }))
}

function metricOrNull(value: number | undefined, min = 1) {
  return typeof value === "number" && value >= min ? Math.round(value) : null
}

function caloriesOrNull(value: number | undefined) {
  if (typeof value !== "number" || value < 1) return null
  return normalizeCalories(value)
}

async function mapActivity(
  coros: CorosApi,
  activity: Activity,
  kind: ActivityKind,
): Promise<OutdoorActivity> {
  let elevationFeet = 0
  let track: ActivityTrackPoint[] = []
  let imagePath: string | null = null
  let avgHeartRate: number | null = null
  let maxHeartRate: number | null = null
  let avgCadence: number | null = null
  let calories: number | null = null
  let pauseTimeMinutes: number | null = null
  let movingTimeMinutes = corosTimeToMinutes(
    corosMovingSeconds({
      workoutTime: activity.workoutTime,
      totalTime: activity.totalTime,
    }),
  )

  try {
    const details = await coros.getActivityDetails(
      activity.labelId,
      String(activity.sportType),
    )
    const summary = details.summary

    elevationFeet = metersToFeet(summary?.elevGain ?? 0)
    track = simplifyTrack(details.frequencyList ?? [])
    avgHeartRate = metricOrNull(summary?.avgHr, 40)
    maxHeartRate = metricOrNull(summary?.maxHr, 40)
    avgCadence = metricOrNull(summary?.avgCadence, 1)
    calories = caloriesOrNull(summary?.calories)
    pauseTimeMinutes = summary?.pauseTime
      ? corosTimeToMinutes(summary.pauseTime)
      : null
    movingTimeMinutes = corosTimeToMinutes(
      corosMovingSeconds({
        workoutTime: summary?.workoutTime ?? activity.workoutTime,
        totalTime: summary?.totalTime ?? activity.totalTime,
        pauseTime: summary?.pauseTime,
      }),
    )
  } catch {
    // keep list-level fields when detail fetch fails
  }

  if (activity.imageUrl) {
    imagePath = await saveHikeImage(activity.labelId, activity.imageUrl)
  }

  return {
    id: activity.labelId,
    name: activity.name,
    date: timestampToDate(activity.startTime),
    kind,
    distanceMiles: metersToMiles(activity.distance),
    elevationFeet,
    movingTimeMinutes,
    pauseTimeMinutes,
    avgHeartRate,
    maxHeartRate,
    avgCadence,
    calories,
    imagePath,
    track,
  }
}

async function clearCorosToken() {
  await rm(TOKEN_DIR, { recursive: true, force: true })
}

function isInvalidTokenError(error: unknown) {
  if (!(error instanceof Error)) return false

  const message = error.message.toLowerCase()
  return message.includes("1019") || message.includes("access token is invalid")
}

async function loginCorosClient(coros: CorosApi) {
  await coros.login()
  coros.exportTokenToFile(TOKEN_DIR)
}

async function createCorosClient(useCachedToken = true) {
  const coros = new CorosApi({
    email: env.COROS_EMAIL!,
    password: env.COROS_PASSWORD!,
  })

  if (useCachedToken && isDirectory(TOKEN_DIR)) {
    try {
      coros.loadTokenByFile(TOKEN_DIR)
      return coros
    } catch {
      // token files missing or unreadable
    }
  }

  await loginCorosClient(coros)
  return coros
}

async function withCorosClient<T>(
  run: (coros: CorosApi) => Promise<T>,
): Promise<T> {
  let coros = await createCorosClient(true)

  try {
    return await run(coros)
  } catch (error) {
    if (!isInvalidTokenError(error)) throw error

    await clearCorosToken()
    coros = await createCorosClient(false)
    return run(coros)
  }
}

async function fetchActivityPages(coros: CorosApi): Promise<CorosActivities> {
  const hikes: OutdoorActivity[] = []
  const runs: OutdoorActivity[] = []
  const rides: OutdoorActivity[] = []

  for (
    let page = 1;
    page <= MAX_PAGES &&
    (hikes.length < MAX_HIKES ||
      runs.length < MAX_RUNS ||
      rides.length < MAX_RIDES);
    page++
  ) {
    const result = await coros.getActivitiesList({ page, size: 30 })
    const activities = result.dataList ?? []
    if (activities.length === 0) break

    for (const activity of activities) {
      const kind = activityKind(activity.sportType)
      if (!kind) continue
      if (kind === "hike" && hikes.length >= MAX_HIKES) continue
      if (kind === "run" && runs.length >= MAX_RUNS) continue
      if (kind === "ride" && rides.length >= MAX_RIDES) continue

      const mapped = await mapActivity(coros, activity, kind)
      if (kind === "hike") hikes.push(mapped)
      else if (kind === "run") runs.push(mapped)
      else rides.push(mapped)
    }
  }

  return { hikes, runs, rides }
}

export async function fetchActivitiesFromCoros(): Promise<CorosActivities> {
  if (!hasCredentials()) {
    return { hikes: [], runs: [], rides: [] }
  }

  return withCorosClient(fetchActivityPages)
}

/** @deprecated */
export async function fetchHikesFromCoros(): Promise<OutdoorActivity[]> {
  const { hikes } = await fetchActivitiesFromCoros()
  return hikes
}

export { hasCredentials as hasCorosCredentials }
