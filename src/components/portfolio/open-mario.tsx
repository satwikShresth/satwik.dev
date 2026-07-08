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
          Open-source platform for Drexel students to search job listings,
          courses, and professor ratings in one place
        </li>
        <li>
          200+ weekly active users and 220+ wage submissions, without any
          marketing, just word of mouth and a{" "}
          <a
            href="https://www.reddit.com/r/Drexel/comments/1jsa5tj/i_made_the_drexel_term_master_we_deserve/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            Reddit post
          </a>
        </li>
        <li>Self-hosted on personal VPS</li>
      </ul>
    </ProjectSection>
  )
}
