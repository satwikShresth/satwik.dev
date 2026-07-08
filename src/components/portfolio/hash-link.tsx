import { setPortfolioHash } from "@/lib/portfolio-nav"
import { cn } from "@/lib/utils"

type HashLinkProps = {
  id: string
  className?: string
  label?: string
}

export function HashLink({ id, className, label = "Copy link" }: HashLinkProps) {
  return (
    <a
      href={`#${id}`}
      className={cn(
        "hash-link inline-flex shrink-0 items-center justify-center leading-none text-muted-foreground/50 transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]",
        className,
      )}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault()
        setPortfolioHash(id)
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })

        const url = `${window.location.origin}${window.location.pathname}#${id}`
        void navigator.clipboard?.writeText(url)
      }}
    >
      #
    </a>
  )
}
