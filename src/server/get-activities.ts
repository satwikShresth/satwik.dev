import { createServerFn } from "@tanstack/react-start"
import { getActivityLoaderData } from "@/lib/coros/cache"

export const getActivities = createServerFn({ method: "GET" }).handler(
  async () => getActivityLoaderData(),
)
