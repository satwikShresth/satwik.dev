import type { OutdoorActivity } from "@/lib/hikes/types"
import { ActivityRow } from "@/components/portfolio/activity-card"
import { HashLink } from "@/components/portfolio/hash-link"

const ACTIVITIES = [
  "Running",
  "Riding",
  "Bouldering",
  "Hiking",
  "Walking around",
] as const

type OffTheClockProps = {
  id?: string
  hikes?: OutdoorActivity[]
  runs?: OutdoorActivity[]
  rides?: OutdoorActivity[]
}

function ActivitySection({
  id,
  title,
  activities,
}: {
  id: string
  title: string
  activities: OutdoorActivity[]
}) {
  if (activities.length === 0) return null

  return (
    <div id={id} data-section={id} className="scroll-mt-24 flex flex-col gap-2">
      <div className="flex items-center gap-2 font-mono-label text-[length:var(--type-label-sm)] tracking-[0.08em] text-muted-foreground uppercase">
        <span>{title}</span>
        <HashLink id={id} label={`Copy link to ${title}`} />
      </div>
      <div className="flex flex-col gap-1.5">
        {activities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}

export function OffTheClock({
  id = "offtheclock",
  hikes = [],
  runs = [],
  rides = [],
}: OffTheClockProps) {
  const hasActivities =
    hikes.length > 0 || runs.length > 0 || rides.length > 0

  return (
    <section id={id} data-section={id} className="scroll-mt-24">
      <div className="section-label flex items-center gap-2">
        <span>Off the clock</span>
        <HashLink id={id} label="Copy link to off the clock" />
      </div>
      <div className="rounded-[3px] border border-[var(--brd)] bg-[var(--surf)] p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {ACTIVITIES.map((activity) => (
            <span key={activity} className="activity-pill">
              {activity}
            </span>
          ))}
        </div>

        {hasActivities ? (
          <div className="flex flex-col gap-5">
            <ActivitySection
              id="offtheclock-hikes"
              title="Recent hikes"
              activities={hikes}
            />
            <ActivitySection
              id="offtheclock-runs"
              title="Recent runs"
              activities={runs}
            />
            <ActivitySection
              id="offtheclock-rides"
              title="Recent rides"
              activities={rides}
            />
          </div>
        ) : (
          <p className="text-[length:var(--type-body)] leading-[1.55] text-muted-foreground">
            No activities synced yet.
          </p>
        )}
      </div>
    </section>
  )
}
