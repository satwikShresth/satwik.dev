import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getIcon } from "@/lib/architecture/iconMap"
import type { LabelData, NodeData } from "@/lib/architecture/types"
import { cn } from "@/lib/utils"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { memo } from "react"

export const InfoNode = memo(function InfoNode(props: NodeProps) {
  const data = props.data as NodeData
  const label = data.label
  const IconComponent =
    label && typeof label === "object" && "iconName" in label
      ? getIcon((label as LabelData).iconName)
      : null

  const card = data.Card as
    | { Header?: string; Body?: string; Footer?: string }
    | undefined
  const tooltipData =
    card && (card.Header || card.Body || card.Footer)
      ? {
          header: card.Header ?? "",
          body: card.Body ?? "",
          footer: card.Footer ?? "",
        }
      : null

  const border = data.style?.border

  const cardBody = (
    <Card
      className={cn(
        "px-3 py-1.5 min-w-[120px]",
        tooltipData ? "cursor-default" : undefined,
      )}
      style={border ? { border } : undefined}
    >
      <CardContent className="p-0 flex items-center justify-center gap-1.5 text-card-foreground">
        {IconComponent &&
        label &&
        typeof label === "object" &&
        "iconName" in label ? (
          <>
            <IconComponent className="size-3.5 text-card-foreground" />
            <span className="text-sm">{(label as LabelData).text}</span>
          </>
        ) : typeof label === "string" ? (
          <span className="text-sm">{label}</span>
        ) : null}
      </CardContent>
    </Card>
  )

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="!bg-border !w-2 !h-2" />
      {tooltipData ? (
        <Tooltip>
          <TooltipTrigger asChild>{cardBody}</TooltipTrigger>
          <TooltipContent side="top" className="max-w-[240px]">
            {tooltipData.header ? (
              <div className="font-semibold mb-1 text-foreground">
                {tooltipData.header}
              </div>
            ) : null}
            {tooltipData.body ? (
              <div className="text-sm mb-1 text-foreground">{tooltipData.body}</div>
            ) : null}
            {tooltipData.footer ? (
              <div className="text-xs italic text-muted-foreground">
                {tooltipData.footer}
              </div>
            ) : null}
          </TooltipContent>
        </Tooltip>
      ) : (
        cardBody
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-border !w-2 !h-2"
      />
    </div>
  )
})
