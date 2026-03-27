import type { ArchitectureDiagramProps } from "@/lib/architecture/types"
import { addDefaultsToNodes, applyAutoLayout } from "@/lib/architecture/utils"
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeTypes,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useLayoutEffect, useState } from "react"
import { CustomEdge } from "./custom-edge"
import { InfoNode } from "./info-node"

const nodeTypes: NodeTypes = { info: InfoNode }
const edgeTypes: EdgeTypes = { custom: CustomEdge }

export function ArchitectureDiagramInner({
  nodes: rawNodes,
  edges: rawEdges,
  direction = "TB",
  height = 1000,
  padding = 20,
}: ArchitectureDiagramProps) {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [bg, setBg] = useState("#ffffff")

  useLayoutEffect(() => {
    const nodesWithDefaults = addDefaultsToNodes(rawNodes)
    const laidOut = applyAutoLayout(nodesWithDefaults, rawEdges, direction)
    const processedNodes: Node[] = laidOut
      .filter((node) => node.type !== "labeledGroup")
      .map((node) => {
        const { parentId: _p, ...rest } = node as typeof node & {
          parentId?: string
        }
        return {
          ...rest,
          type: rest.type ?? "default",
          position: rest.position ?? { x: 0, y: 0 },
        } as Node
      })

    const processedEdges: Edge[] = rawEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      markerEnd: e.markerEnd,
      type: "custom",
    }))

    setNodes(processedNodes)
    setEdges(processedEdges)

    const updateColor = () => {
      const root = document.documentElement
      const computed = getComputedStyle(root)
        .getPropertyValue("--background")
        .trim()
      setBg(computed || "#ffffff")
    }
    updateColor()
    const observer = new MutationObserver(updateColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [rawNodes, rawEdges, direction])

  const h =
    typeof height === "number" ? height : Number.parseInt(String(height), 10) || 500

  return (
    <div
      className="w-full rounded-lg overflow-hidden bg-background"
      style={{ height: h }}
    >
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: padding / 100, minZoom: 0.5, maxZoom: 1.2 }}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          gap={20}
          variant={BackgroundVariant.Dots}
          bgColor={bg}
        />
      </ReactFlow>
    </div>
  )
}
