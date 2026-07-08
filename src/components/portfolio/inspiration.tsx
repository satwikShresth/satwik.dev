import { env } from "@/env"
import { edges, nodes } from "@/lib/architecture/inspiration"
import { ArchitectureDiagramLoader } from "./architecture-diagram-loader"
import { ProjectSection } from "./project-section"

const techStack = [
  "Celery",
  "Docker",
  "Playwright",
  "Postgres",
  "Python",
  "React",
  "Redis",
  "Rust",
  "S3",
  "TanStack",
]

export function Inspiration({ id = "inspiration" }: { id?: string }) {
  const videoUrl = env.VITE_PUBLIC_S3_INSP_VIDEO

  return (
    <ProjectSection
      id={id}
      title="Inspiration"
      links={[
        {
          href: "https://gitlab.cci.drexel.edu/inspiration",
          label: "GitLab",
        },
      ]}
      techStack={techStack}
      diagram={
        <>
          <ArchitectureDiagramLoader
            nodes={nodes}
            edges={edges}
            direction="TB"
            height={300}
            padding={4}
          />
          {videoUrl ? (
            <div className="mt-2 overflow-hidden rounded-[3px] border border-[var(--brd)]">
              <video
                controls
                src={videoUrl}
                preload="metadata"
                className="max-h-36 w-full object-cover"
              >
                <track kind="captions" />
              </video>
            </div>
          ) : null}
        </>
      }
    >
      <ul className="space-y-1">
        <li>
          Plagiarism detection tool for Drexel, built to run self-hosted
        </li>
        <li>
          Compares submissions across code, text, and other formats
        </li>
      </ul>
    </ProjectSection>
  )
}
