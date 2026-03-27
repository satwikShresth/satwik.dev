import { Inspiration } from "./inspiration"
import { OpenMario } from "./open-mario"
import { PersonalWebsiteSection } from "./personal-website"
import { Shelved } from "./shelved"

export function Projects() {
  return (
    <div id="projects" className="scroll-mt-32">
      <OpenMario />
      <Inspiration />
      <Shelved />
      <PersonalWebsiteSection />
    </div>
  )
}
