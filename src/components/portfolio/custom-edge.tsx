import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react"
import { useEffect, useState } from "react"

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  label,
}: EdgeProps) {
  const [labelColor, setLabelColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement
      const computedFg = getComputedStyle(root)
        .getPropertyValue("--foreground")
        .trim()
      const computedBg = getComputedStyle(root)
        .getPropertyValue("--background")
        .trim()
      setLabelColor(computedFg || "#000000")
      setBackgroundColor(computedBg || "#ffffff")
    }
    updateColors()
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
      {label ? (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan"
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              fontWeight: 500,
              padding: "2px 4px",
              borderRadius: 3,
              pointerEvents: "all",
              color: labelColor,
              backgroundColor,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}
