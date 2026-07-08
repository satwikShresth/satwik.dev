import { OpenMario } from "./open-mario"
import { Inspiration } from "./inspiration"
import { Shelved } from "./shelved"
import { PersonalWebsiteSection } from "./personal-website"
import { HashLink } from "@/components/portfolio/hash-link"

export function Projects() {
  return (
    <div id="projects" data-section="projects" className="scroll-mt-24">
      <div className="section-label flex items-center gap-2">
        <span>Projects</span>
        <HashLink id="projects" label="Copy link to projects" />
      </div>
      <OpenMario />
      <Inspiration />
      <Shelved />
      <PersonalWebsiteSection />
    </div>
  )
}
