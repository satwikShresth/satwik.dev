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
  type ReactFlowInstance,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useCallback, useMemo, useRef } from "react"
import { CustomEdge } from "./custom-edge"
import { InfoNode } from "./info-node"

const nodeTypes: NodeTypes = { info: InfoNode }
const edgeTypes: EdgeTypes = { custom: CustomEdge }

function layoutDiagram(
  rawNodes: ArchitectureDiagramProps["nodes"],
  rawEdges: ArchitectureDiagramProps["edges"],
  direction: ArchitectureDiagramProps["direction"],
) {
  const nodesWithDefaults = addDefaultsToNodes(rawNodes)
  const laidOut = applyAutoLayout(nodesWithDefaults, rawEdges, direction)
  const nodes: Node[] = laidOut
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

  const edges: Edge[] = rawEdges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    markerEnd: e.markerEnd,
    type: "custom",
  }))

  return { nodes, edges }
}

export function ArchitectureDiagramInner({
  nodes: rawNodes,
  edges: rawEdges,
  direction = "TB",
  height = 1000,
  padding = 20,
}: ArchitectureDiagramProps) {
  const fittedRef = useRef(false)
  const { nodes, edges } = useMemo(
    () => layoutDiagram(rawNodes, rawEdges, direction),
    [rawNodes, rawEdges, direction],
  )

  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      if (fittedRef.current) return
      fittedRef.current = true
      instance.fitView({
        padding: padding / 100,
        minZoom: 0.5,
        maxZoom: 1.2,
      })
    },
    [padding],
  )

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
        onInit={onInit}
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
        <Background gap={20} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  )
}
