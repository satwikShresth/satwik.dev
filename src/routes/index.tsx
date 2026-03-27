import { About } from "@/components/portfolio/about"
import { Experience } from "@/components/portfolio/experience"
import { Footer } from "@/components/portfolio/footer"
import { Header } from "@/components/portfolio/header"
import { HenonAttractor } from "@/components/portfolio/henon-attractor"
import { Projects } from "@/components/portfolio/projects"
import { isPortfolioHashId } from "@/lib/portfolio-nav"
import { createFileRoute } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  const [activeSection, setActiveSection] = useState("")

  const updateActiveSection = useCallback(() => {
    const viewportTop = window.scrollY + 150
    const sections = document.querySelectorAll("[data-project-section]")
    const sectionsArray = Array.from(sections)

    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100

    if (isAtBottom && sectionsArray.length > 0) {
      const lastSection = sectionsArray[sectionsArray.length - 1]
      const lastSectionId = lastSection.getAttribute("data-project-section")
      if (lastSectionId) {
        setActiveSection(lastSectionId)
      }
      return
    }

    let closestSection = ""
    let closestDistance = Number.POSITIVE_INFINITY

    for (const section of sectionsArray) {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const sectionId = section.getAttribute("data-project-section")

      if (sectionId) {
        const distance = Math.abs(sectionTop - viewportTop)
        if (sectionTop <= viewportTop + 200 && distance < closestDistance) {
          closestDistance = distance
          closestSection = sectionId
        }
      }
    }

    if (closestSection) {
      setActiveSection(closestSection)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", updateActiveSection)
    updateActiveSection()
    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [updateActiveSection])

  const scrollToHashId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "instant", block: "start" })
    setActiveSection(id)
    updateActiveSection()
  }, [updateActiveSection])

  useEffect(() => {
    function applyHashFromUrl() {
      const id = window.location.hash.replace(/^#/, "")
      if (!id || !isPortfolioHashId(id)) return
      requestAnimationFrame(() => scrollToHashId(id))
    }
    applyHashFromUrl()
    window.addEventListener("popstate", applyHashFromUrl)
    return () => window.removeEventListener("popstate", applyHashFromUrl)
  }, [scrollToHashId])

  useEffect(() => {
    const diamondGifElement = document.getElementById(
      "diamond_gif",
    ) as HTMLImageElement | null
    if (!diamondGifElement) return
    const interval = window.setInterval(() => {
      diamondGifElement.src = diamondGifElement.src
    }, 3400)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="w-full flex-1 overflow-visible pt-24 lg:pt-40">
        <div className="relative mx-auto max-w-5xl overflow-visible px-6 lg:px-8">
          <div className="relative space-y-24 overflow-visible py-24 pb-32 lg:space-y-32">
            <HenonAttractor />
            <About />
            <Experience />
            <Projects />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
