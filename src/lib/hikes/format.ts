import type { OutdoorActivity } from "@/lib/hikes/types"

type CorosTimeFields = {
  workoutTime?: number
  totalTime?: number
  pauseTime?: number
}

function corosTimeToSeconds(value: number) {
  if (value <= 0) return 0
  // COROS detail fields are often deciseconds (0.1s).
  if (value >= 100_000) return Math.round(value / 10)
  return value
}

export function corosMovingSeconds(fields: CorosTimeFields) {
  const workout = corosTimeToSeconds(fields.workoutTime ?? 0)
  if (workout > 0) return workout

  const total = corosTimeToSeconds(fields.totalTime ?? 0)
  const pause = corosTimeToSeconds(fields.pauseTime ?? 0)

  if (total > 0 && pause > 0 && total > pause) {
    return total - pause
  }

  return total
}

export function corosTimeToMinutes(value: number) {
  return Math.round(corosTimeToSeconds(value) / 60)
}

const MAX_RUNNING_PACE_MIN_PER_MI = 45
const MAX_RIDE_PACE_MIN_PER_MI = 60

function maxPaceForKind(kind: OutdoorActivity["kind"]) {
  if (kind === "hike") return 120
  if (kind === "ride") return MAX_RIDE_PACE_MIN_PER_MI
  return MAX_RUNNING_PACE_MIN_PER_MI
}

export function normalizeMovingTimeMinutes(
  minutes: number,
  distanceMiles: number,
  kind: OutdoorActivity["kind"] = "hike",
  pauseTimeMinutes: number | null = null,
) {
  if (minutes < 1) return 0

  const maxPace = maxPaceForKind(kind)

  if (minutes <= 5000 && distanceMiles >= 0.1) {
    const pace = minutes / distanceMiles
    if (pace <= maxPace) return minutes

    const fromSeconds = corosTimeToMinutes(minutes)
    if (fromSeconds >= 1 && fromSeconds / distanceMiles <= maxPace) {
      return fromSeconds
    }
  } else if (minutes <= 5000) {
    return minutes
  }

  // Legacy cache stored raw COROS elapsed time in movingTimeMinutes.
  const movingSeconds = corosMovingSeconds({
    totalTime: minutes,
    pauseTime: pauseTimeMinutes ?? 0,
  })

  return Math.max(1, corosTimeToMinutes(movingSeconds))
}

export function normalizeCalories(calories: number | null) {
  if (typeof calories !== "number" || calories < 10) return null
  if (calories >= 5000) return Math.round(calories / 1000)
  return Math.round(calories)
}

export function computePaceMinutesPerMile(
  distanceMiles: number,
  movingTimeMinutes: number,
  kind: OutdoorActivity["kind"] = "run",
) {
  if (distanceMiles < 0.1 || movingTimeMinutes < 1) return null

  const pace = movingTimeMinutes / distanceMiles
  const minPace = kind === "ride" ? 2 : 3.5
  const maxPace = maxPaceForKind(kind)

  if (pace < minPace || pace > maxPace) return null

  return pace
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function formatDuration(minutes: number) {
  if (minutes < 1) return null
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return remainder > 0 ? `${hours}h ${remainder}m` : `${hours}h`
}

export function formatPace(minutesPerMile: number) {
  const minutes = Math.floor(minutesPerMile)
  const seconds = Math.round((minutesPerMile - minutes) * 60)
  const normalizedSeconds = seconds === 60 ? 0 : seconds
  const normalizedMinutes = seconds === 60 ? minutes + 1 : minutes

  return `${normalizedMinutes}:${normalizedSeconds.toString().padStart(2, "0")}/mi`
}

export function activitySummaryLine(activity: OutdoorActivity) {
  const movingMinutes = normalizeMovingTimeMinutes(
    activity.movingTimeMinutes,
    activity.distanceMiles,
    activity.kind,
    activity.pauseTimeMinutes,
  )
  const parts = [formatDate(activity.date), activity.name]

  if (activity.distanceMiles >= 0.1) {
    parts.push(`${activity.distanceMiles.toFixed(1)} mi`)
  }

  const duration = formatDuration(movingMinutes)
  if (duration) parts.push(duration)

  if (
    (activity.kind === "run" || activity.kind === "ride") &&
    activity.avgHeartRate
  ) {
    parts.push(`${activity.avgHeartRate} bpm`)
  }

  return parts.join(" · ")
}

export function activityStats(activity: OutdoorActivity) {
  const movingMinutes = normalizeMovingTimeMinutes(
    activity.movingTimeMinutes,
    activity.distanceMiles,
    activity.kind,
    activity.pauseTimeMinutes,
  )
  const stats: Array<{ label: string; value: string }> = []
  const duration = formatDuration(movingMinutes)

  if (duration) stats.push({ label: "Time", value: duration })

  if (activity.distanceMiles >= 0.1) {
    stats.push({
      label: "Distance",
      value: `${activity.distanceMiles.toFixed(1)} mi`,
    })
  }

  if (activity.elevationFeet >= 50) {
    stats.push({
      label: "Elev gain",
      value: `${Math.round(activity.elevationFeet).toLocaleString()} ft`,
    })
  }

  if (activity.kind === "run" || activity.kind === "ride") {
    if (activity.avgHeartRate) {
      stats.push({
        label: "Avg HR",
        value: `${activity.avgHeartRate} bpm`,
      })
    }

    if (activity.maxHeartRate) {
      stats.push({
        label: "Max HR",
        value: `${activity.maxHeartRate} bpm`,
      })
    }

    if (activity.kind === "run" && activity.avgCadence) {
      stats.push({
        label: "Cadence",
        value: `${activity.avgCadence} spm`,
      })
    }

    if (activity.kind === "ride" && activity.avgCadence) {
      stats.push({
        label: "Cadence",
        value: `${activity.avgCadence} rpm`,
      })
    }

    const pace = computePaceMinutesPerMile(
      activity.distanceMiles,
      movingMinutes,
      activity.kind,
    )
    if (pace) {
      stats.push({
        label: "Pace",
        value: formatPace(pace),
      })
    }
  }

  const calories = normalizeCalories(activity.calories)
  if (calories) {
    stats.push({
      label: "Calories",
      value: `${calories.toLocaleString()} kcal`,
    })
  }

  return stats
}
