import { GitHubIcon } from "@/components/icons/github"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ThemeToggle"
import {
  PROJECT_SECTION_IDS,
  PROJECT_SECTION_LABELS,
  isProjectsAreaActive,
  setPortfolioHash,
} from "@/lib/portfolio-nav"
import { useEffect, useState } from "react"
import { MobileHeader } from "./mobile-header"

type NavItem = { id: string; label: string; href?: string }

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Exprience" },
  { id: "projects", label: "Projects" },
]

const projectItems = PROJECT_SECTION_IDS.map((id) => ({
  id,
  label: PROJECT_SECTION_LABELS[id],
}))

export function Header({
  activeSection,
  setActiveSection,
}: {
  activeSection: string
  setActiveSection: (id: string) => void
}) {
  const [isScrolled, setIsScrolled] = useState(false)

  const isInProjectsSection = isProjectsAreaActive(activeSection)

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault()
    setActiveSection(id)
    setPortfolioHash(id)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
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

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <MobileHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <header
        className={`fixed top-0 right-0 left-0 z-50 hidden border-b border-border/20 backdrop-blur-lg transition-all duration-300 lg:block ${
          isScrolled ? "h-20" : "h-40"
        }`}
      >
        <div className="mx-auto h-full max-w-5xl px-8">
          <div
            className={`flex h-full items-center justify-between transition-all duration-300 ${
              isScrolled ? "" : "py-6"
            }`}
          >
            <div className="flex flex-col items-start">
              <a
                href="/"
                className={`text-foreground transition-all duration-300 hover:opacity-80 ${
                  isScrolled ? "text-xl font-semibold" : "text-5xl font-semibold"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Satwik Shresth
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end gap-2">
                <nav
                  className={`hidden items-center gap-6 md:flex lg:gap-8 ${
                    isScrolled ? "text-sm" : "text-base lg:text-lg"
                  } transition-all duration-300`}
                >
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative font-normal transition-all duration-200 ${
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
                </nav>

                <nav className="hidden items-center gap-4 text-xs text-muted-foreground md:flex lg:text-sm">
                  {projectItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative transition-all duration-200 ${
                        activeSection === item.id
                          ? "font-medium text-foreground"
                          : "hover:text-foreground"
                      }`}
                      onClick={(e) => handleClick(e, item.id)}
                    >
                      {item.label}
                      {activeSection === item.id ? (
                        <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full" />
                      ) : null}
                    </a>
                  ))}
                </nav>
              </div>

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
          </div>
        </div>
      </header>
    </>
  )
}
