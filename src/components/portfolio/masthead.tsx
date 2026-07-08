import { ModeToggle } from "@/components/ThemeToggle"

export function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-foreground/90 bg-background">
      <div className="site-container-mobile flex items-center justify-between py-[11px]">
        <a
          href="/"
          className="font-mono-label text-[length:var(--type-nav)] tracking-[0.12em] text-muted-foreground uppercase"
        >
          satwik.dev
        </a>

        <div className="hidden font-mono-label text-[length:var(--type-nav)] text-muted-foreground sm:block">
          Philadelphia · {new Date().getFullYear()}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a href="/resume.pdf" className="editorial-link">
            Resume ↗
          </a>
          <a
            href="https://github.com/satwikShresth"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hidden sm:inline"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/satwik-shresth/"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hidden md:inline"
          >
            LinkedIn ↗
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
