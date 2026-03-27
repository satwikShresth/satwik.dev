import { GitHubIcon } from "@/components/icons/github"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ThemeToggle"
import {
  PROJECT_SECTION_IDS,
  PROJECT_SECTION_LABELS,
  isProjectsAreaActive,
  setPortfolioHash,
} from "@/lib/portfolio-nav"

type NavItem = { id: string; label: string }

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Exprience" },
  { id: "projects", label: "Projects" },
]

const projectItems = PROJECT_SECTION_IDS.map((id) => ({
  id,
  label: PROJECT_SECTION_LABELS[id],
}))

export function MobileHeader({
  activeSection,
  setActiveSection,
}: {
  activeSection: string
  setActiveSection: (id: string) => void
}) {
  const isInProjectsSection = isProjectsAreaActive(activeSection)

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault()
    setActiveSection(id)
    setPortfolioHash(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function scrollToProjectsBlock(e: React.MouseEvent) {
    e.preventDefault()
    setActiveSection("projects")
    setPortfolioHash("projects")
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/20 backdrop-blur-xl lg:hidden">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-semibold text-foreground hover:opacity-80"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Satwik Shresth
          </a>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              className="group h-11 w-11 rounded-full transition-colors hover:bg-muted/80"
            >
              <a
                href="https://github.com/satwikShresth/satwik.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-full items-center justify-center"
              >
                <GitHubIcon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
        <nav className="mt-2 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative transition-all duration-200 ${
                  (isInProjectsSection && item.id === "projects") ||
                  (!isInProjectsSection && activeSection === item.id)
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={(e) => {
                  if (item.id === "projects") {
                    scrollToProjectsBlock(e)
                  } else {
                    handleClick(e, item.id)
                  }
                }}
              >
                {item.label}
                {((isInProjectsSection && item.id === "projects") ||
                  (!isInProjectsSection && activeSection === item.id)) && (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full" />
                )}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {projectItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative transition-all duration-200 ${
                  activeSection === item.id
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
                {activeSection === item.id ? (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full" />
                ) : null}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
