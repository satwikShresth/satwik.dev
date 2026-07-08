import { TechTags } from "@/components/portfolio/tech-tags"
import { HashLink } from "@/components/portfolio/hash-link"
import { cn } from "@/lib/utils"

type ProjectLink = {
  href: string
  label: string
  primary?: boolean
}

export function ProjectSection({
  id,
  title,
  links,
  children,
  techStack,
  diagram,
  className,
  bordered = true,
}: {
  id: string
  title: string
  links: ProjectLink[]
  children: React.ReactNode
  techStack: string[]
  diagram?: React.ReactNode
  className?: string
  bordered?: boolean
}) {
  return (
    <section
      id={id}
      data-project-section={id}
      className={cn(
        "scroll-mt-24 pt-4",
        bordered && "border-b border-[var(--brd)] pb-6",
        className,
      )}
    >
      <div className="mb-2 flex items-baseline justify-between gap-3">
          <h3 className="flex items-center gap-2 font-serif-display text-[length:var(--type-heading)] text-foreground italic">
            <span>{title}</span>
            <HashLink id={id} label={`Copy link to ${title}`} />
          </h3>
          <div className="flex shrink-0 gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.primary !== false ? "editorial-link" : "editorial-link-subtle"
                }
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="text-[length:var(--type-body)] leading-[1.7] text-foreground/92">
          {children}
        </div>

        {diagram ? (
          <div className="mt-4 overflow-hidden rounded-[3px]">{diagram}</div>
        ) : null}

        <TechTags tags={techStack} className="mt-4" />
    </section>
  )
}
