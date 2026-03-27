import { env } from "@/env"
import { edges, nodes } from "@/lib/architecture/inspiration"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { ArchitectureDiagramLoader } from "./architecture-diagram-loader"

const techStack = [
  "Docker",
  "React",
  "TanStack",
  "S3",
  "Celery",
  "Redis",
  "Postgres",
  "Python",
  "Playwright",
  "Rust",
].sort()

export function Inspiration({ id = "inspiration" }: { id?: string }) {
  const videoUrl = env.VITE_PUBLIC_S3_INSP_VIDEO

  return (
    <section
      id={id}
      data-project-section={id}
      className="mb-20 scroll-mt-32 border-b border-border/20 pb-20"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
            Project 02
          </div>
          <h2
            className="mb-6 text-3xl font-semibold text-foreground lg:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Inspiration
          </h2>
          <div className="mx-auto max-w-sm rounded bg-white p-4 pt-4 lg:mx-0 lg:max-w-none">
            <img
              src="/inspiraiton.png"
              alt="Inspiration"
              className="w-full rounded object-contain"
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://gitlab.cci.drexel.edu/inspiration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 transition-colors duration-200 hover:border-border hover:bg-accent/50"
              aria-label="Inspiration GitLab"
            >
              <ExternalLink className="h-4 w-4 text-foreground" />
              <span className="text-sm text-foreground">GitLab</span>
            </a>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-8">
          <div className="space-y-4 text-base leading-relaxed text-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                FERPA-compliant open-source plagiarism detection software
                developed for Drexel University, enabling self-hosted and
                privacy-focused implementation
              </li>
              <li>
                Incorporates multi-modal detection techniques based on Stanford
                research papers with enhanced visualization for software
                similarity analysis
              </li>
            </ul>
          </div>

          <div className="py-8">
            <ArchitectureDiagramLoader
              nodes={nodes}
              edges={edges}
              direction="TB"
              height={500}
              padding={5}
            />
          </div>

          {videoUrl ? (
            <div className="py-4">
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                  <video
                    controls
                    width="100%"
                    className="rounded-lg"
                    src={videoUrl}
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          ) : null}

          <div>
            <h3
              className="mb-4 text-xl font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
