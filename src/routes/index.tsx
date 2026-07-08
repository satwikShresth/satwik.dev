import { Experience } from "@/components/portfolio/experience"
import { Footer } from "@/components/portfolio/footer"
import { Hero } from "@/components/portfolio/hero"
import { Masthead } from "@/components/portfolio/masthead"
import { OffTheClock } from "@/components/portfolio/off-the-clock"
import { Projects } from "@/components/portfolio/projects"
import { SectionNav } from "@/components/portfolio/section-nav"
import { usePortfolioHashScroll } from "@/components/use-portfolio-hash"
import { createFileRoute } from "@tanstack/react-router"
import { getActivities } from "@/server/get-activities"

export const Route = createFileRoute("/")({
  loader: () => getActivities(),
  staleTime: Number.POSITIVE_INFINITY,
  gcTime: Number.POSITIVE_INFINITY,
  component: HomePage,
})

function HomePage() {
  const { hikes, runs, rides } = Route.useLoaderData()
  usePortfolioHashScroll()

  return (
    <div className="flex min-h-screen flex-col">
      <Masthead />
      <Hero />
      <SectionNav />

      <main className="flex-1">
        <div className="site-container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] lg:items-start">
            <div className="py-10 lg:py-12 lg:pr-12">
              <Experience />
              <div className="mt-10">
                <OffTheClock hikes={hikes} runs={runs} rides={rides} />
              </div>
            </div>

            <div className="hidden bg-[var(--brd)]/70 lg:block" aria-hidden />

            <div className="border-t border-[var(--brd)]/80 py-10 lg:border-t-0 lg:py-12 lg:pl-12">
              <Projects />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
