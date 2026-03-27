import { type ComponentType, useEffect, useState } from "react"

export function HenonAttractor() {
  const [Inner, setInner] = useState<ComponentType | null>(null)

  useEffect(() => {
    let cancelled = false
    void import("./henon-attractor-inner").then((m) => {
      if (!cancelled) setInner(() => m.HenonAttractorInner)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!Inner) return null

  return <Inner />
}
