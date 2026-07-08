import {
  MAIN_SECTION_IDS,
  setPortfolioHash,
  type MainSectionId,
} from "@/lib/portfolio-nav"
import { cn } from "@/lib/utils"
import { useState } from "react"

const LABELS: Record<MainSectionId, string> = {
  experience: "Experience",
  projects: "Projects",
  offtheclock: "Off the clock",
}

export function SectionNav() {
  const [activeSection, setActiveSection] =
    useState<MainSectionId>("experience")

  return (
    <div className="border-b-[3px] border-foreground/90 bg-background">
      <nav className="site-container-mobile flex items-center gap-5 overflow-x-auto py-2.5 sm:gap-7">
        {MAIN_SECTION_IDS.map((id, index) => (
          <div key={id} className="flex shrink-0 items-center gap-5 sm:gap-7">
            {index > 0 ? (
              <div className="h-3 w-px bg-[var(--brd)]" aria-hidden />
            ) : null}
            <a
              href={`#${id}`}
              className={cn("nav-item", activeSection === id && "active")}
              onClick={(e) => {
                e.preventDefault()
                setActiveSection(id)
                setPortfolioHash(id)
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
            >
              {LABELS[id]}
            </a>
          </div>
        ))}
      </nav>
    </div>
  )
}
