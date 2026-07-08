import { cn } from "@/lib/utils"

export function TechTags({
  tags,
  className,
}: {
  tags: string[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <span key={tag} className="tech-tag">
          {tag}
        </span>
      ))}
    </div>
  )
}
