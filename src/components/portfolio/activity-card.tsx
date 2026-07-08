import { useLayoutEffect, useRef, useState } from "react"
import type { OutdoorActivity } from "@/lib/hikes/types"
import {
  activityStats,
  activitySummaryLine,
  formatDate,
} from "@/lib/hikes/format"
import { ActivityTrackMap } from "@/components/portfolio/activity-track-map"
import { cn } from "@/lib/utils"

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono-label text-[length:var(--type-label-sm)] tracking-[0.06em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-0.5 text-[length:var(--type-body-sm)] text-foreground">
        {value}
      </div>
    </div>
  )
}

type CardPosition = {
  top: number
  left: number
  width: number
}

function ActivityHoverCard({
  activity,
  position,
  cardRef,
}: {
  activity: OutdoorActivity
  position: CardPosition
  cardRef: React.RefObject<HTMLDivElement | null>
}) {
  const track = activity.track ?? []
  const hasTrack = track.length >= 2
  const stats = activityStats(activity)

  return (
    <div
      ref={cardRef}
      className="fixed z-50 rounded-[3px] border border-[var(--brd)] bg-[var(--bg)] shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      role="tooltip"
    >
      {hasTrack ? (
        <div className="relative aspect-[16/9] bg-[var(--surf)]">
          <ActivityTrackMap track={track} />
        </div>
      ) : null}

      <div className="px-3.5 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="font-mono-label text-[length:var(--type-label-sm)] text-muted-foreground">
            {formatDate(activity.date)}
          </div>
          <div className="font-mono-label text-[length:var(--type-label-sm)] tracking-[0.08em] text-[var(--accent)] uppercase">
            {activity.kind}
          </div>
        </div>
        <div className="mt-1 text-[length:var(--type-body-sm)] leading-[1.45] text-foreground">
          {activity.name}
        </div>
        {stats.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            {stats.map((stat) => (
              <Stat key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function useHoverCardPosition(
  rowRef: React.RefObject<HTMLDivElement | null>,
  cardRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
) {
  const [position, setPosition] = useState<CardPosition | null>(null)

  useLayoutEffect(() => {
    if (!open || !rowRef.current) {
      setPosition(null)
      return
    }

    const updatePosition = () => {
      if (!rowRef.current) return

      const row = rowRef.current.getBoundingClientRect()
      const cardHeight = cardRef.current?.offsetHeight ?? 280
      const margin = 8
      const width = Math.min(row.width, 288)
      const left = Math.min(
        row.left,
        Math.max(12, window.innerWidth - width - 12),
      )
      const spaceBelow = window.innerHeight - row.bottom
      const spaceAbove = row.top
      const showAbove =
        spaceBelow < cardHeight + margin && spaceAbove > spaceBelow

      setPosition({
        left,
        width,
        top: showAbove
          ? Math.max(12, row.top - cardHeight - margin)
          : row.bottom + margin,
      })
    }

    updatePosition()
    const frame = requestAnimationFrame(updatePosition)

    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [open, rowRef, cardRef])

  return position
}

export function ActivityRow({ activity }: { activity: OutdoorActivity }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const position = useHoverCardPosition(rowRef, cardRef, open)

  return (
    <div
      ref={rowRef}
      className="relative"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false)
        }
      }}
    >
      <p
        className={cn(
          "cursor-default truncate text-[length:var(--type-body-sm)] leading-[1.55] text-foreground transition-colors",
          open && "text-[var(--accent)]",
        )}
      >
        {activitySummaryLine(activity)}
      </p>
      {open && position ? (
        <ActivityHoverCard
          activity={activity}
          position={position}
          cardRef={cardRef}
        />
      ) : null}
    </div>
  )
}
