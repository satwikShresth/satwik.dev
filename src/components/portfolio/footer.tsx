export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-foreground/90 bg-background">
      <div className="site-container-mobile flex flex-col items-start justify-between gap-3 py-3 sm:flex-row sm:items-center">
        <div className="font-mono-label text-[length:var(--type-nav)] text-muted-foreground">
          © {new Date().getFullYear()} Satwik Shresth
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          <a
            href="https://github.com/satwikShresth/satwik.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link-subtle"
          >
            github ↗
          </a>
          <a
            href="https://linkedin.com/in/satwik-shresth/"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link-subtle"
          >
            linkedin ↗
          </a>
          <a
            href="mailto:satwikshresth@gmail.com"
            className="editorial-link"
          >
            satwikshresth@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
