import { useTheme } from "@/components/use-theme"
import { cn } from "@/lib/utils"
import "leaflet/dist/leaflet.css"
import { useLayoutEffect, useRef } from "react"

type ActivityTrackMapProps = {
  track: Array<{ lat: number; lng: number }>
  className?: string
}

function trackKey(track: ActivityTrackMapProps["track"]) {
  return track
    .map((point) => `${point.lat.toFixed(5)},${point.lng.toFixed(5)}`)
    .join("|")
}

export function ActivityTrackMap({
  track,
  className = "",
}: ActivityTrackMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useLayoutEffect(() => {
    if (!containerRef.current || track.length < 2) return

    let map: import("leaflet").Map | null = null
    let cancelled = false

    void import("leaflet").then((leafletModule) => {
      if (cancelled || !containerRef.current) return

      const L = leafletModule.default
      const latlngs = track.map(
        (point) => [point.lat, point.lng] as [number, number],
      )
      const routeColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#b83232"
      const tileUrl =
        theme === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"

      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
      })

      L.tileLayer(tileUrl, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map)

      L.polyline(latlngs, {
        color: routeColor,
        weight: 3,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map)

      map.fitBounds(L.latLngBounds(latlngs), { padding: [14, 14] })

      requestAnimationFrame(() => {
        map?.invalidateSize()
      })
    })

    return () => {
      cancelled = true
      map?.remove()
      map = null
    }
  }, [trackKey(track), theme])

  if (track.length < 2) return null

  return (
    <div
      ref={containerRef}
      className={cn("activity-track-map absolute inset-0", className)}
      aria-hidden
    />
  )
}
