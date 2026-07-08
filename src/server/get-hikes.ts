import { createServerFn } from "@tanstack/react-start"
import {
  getActivityLoaderData,
  getOffTheClockActivities,
} from "@/lib/coros/cache"

export const getActivities = createServerFn({ method: "GET" }).handler(
  async () => getActivityLoaderData(),
)

/** @deprecated */
export const getHikes = createServerFn({ method: "GET" }).handler(
  async () => {
    const data = await getOffTheClockActivities()
    return data.hikes
  },
)
