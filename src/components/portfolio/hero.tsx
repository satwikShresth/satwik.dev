export function Hero() {
  return (
    <div className="border-b border-[var(--brd)]/80">
      <div className="site-container-mobile pt-8 pb-6 lg:pt-10 lg:pb-8">
        <div className="max-w-3xl">
          <div className="hero-a mb-3 font-mono-label text-[length:var(--type-label)] tracking-[0.1em] text-primary uppercase">
            39.9526° N · 75.1652° W · Philadelphia
          </div>
          <h1 className="hero-a2 font-serif-display leading-[0.87] tracking-[-0.04em]">
            <span className="block text-[clamp(3.25rem,8vw,7rem)] text-foreground">
              Satwik
            </span>
            <span className="block text-[clamp(3.6rem,9vw,8.25rem)] text-primary">
              Shresth
            </span>
          </h1>
          <p className="hero-a3 mt-6 max-w-xl text-[length:var(--type-body)] leading-[1.75] text-foreground">
            Full-stack engineer building end-to-end web applications — focused
            on performance, scalability, and clean architecture.
          </p>
          <p className="hero-a3 mt-3 font-mono-label text-[length:var(--type-label-sm)] tracking-[0.04em] text-muted-foreground">
            Software Engineer at Sharing Excess · Drexel alum
          </p>
        </div>
      </div>
    </div>
  )
}
