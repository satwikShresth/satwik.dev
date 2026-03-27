import type { ArchitectureDiagramProps } from "@/lib/architecture/types"
import { type ComponentType, useEffect, useState } from "react"

type InnerProps = ArchitectureDiagramProps

export function ArchitectureDiagramLoader(props: InnerProps) {
  const [Inner, setInner] = useState<ComponentType<InnerProps> | null>(null)

  useEffect(() => {
    let cancelled = false
    void import("./architecture-diagram-inner").then((m) => {
      if (!cancelled) setInner(() => m.ArchitectureDiagramInner)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const h =
    typeof props.height === "number"
      ? props.height
      : Number.parseInt(String(props.height), 10) || 500

  if (!Inner) {
    return (
      <div
        className="w-full rounded-lg overflow-hidden bg-muted/20"
        style={{ height: h }}
        aria-hidden
      />
    )
  }

  return <Inner {...props} />
}
