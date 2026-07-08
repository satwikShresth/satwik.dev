type HikeMapProps = {
  track: Array<{ lat: number; lng: number }>
  className?: string
}

export function HikeMap({ track, className = "" }: HikeMapProps) {
  if (track.length < 2) return null

  const lats = track.map((point) => point.lat)
  const lngs = track.map((point) => point.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const latSpan = maxLat - minLat || 0.0001
  const lngSpan = maxLng - minLng || 0.0001
  const padding = 8

  const points = track
    .map((point) => {
      const x =
        padding + ((point.lng - minLng) / lngSpan) * (100 - padding * 2)
      const y =
        100 -
        padding -
        ((point.lat - minLat) / latSpan) * (100 - padding * 2)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`block h-full w-full ${className}`}
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
