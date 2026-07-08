import { edges, nodes } from "@/lib/architecture/openmario"
import { ArchitectureDiagramLoader } from "./architecture-diagram-loader"
import { ProjectSection } from "./project-section"

const techStack = [
  "Docker",
  "Meilisearch",
  "Node.js",
  "Postgres",
  "Python",
  "React",
  "TanStack Query",
]

export function OpenMario({ id = "openmario" }: { id?: string }) {
  return (
    <ProjectSection
      id={id}
      title="OpenMario"
      links={[
        { href: "https://www.openmario.com", label: "Live" },
        {
          href: "https://github.com/satwikShresth/OpenMario",
          label: "GitHub",
          primary: false,
        },
      ]}
      techStack={techStack}
      diagram={
        <ArchitectureDiagramLoader
          nodes={nodes}
          edges={edges}
          direction="TB"
          height={300}
          padding={4}
        />
      }
    >
      <ul className="space-y-1">
        <li>
          Job listings, courses, and professor ratings for Drexel students
        </li>
        <li>
          Self-hosted on a VPS. Some regular users, mostly word of mouth
        </li>
      </ul>
    </ProjectSection>
  )
}
