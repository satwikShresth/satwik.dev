import { edges, nodes } from "@/lib/architecture/openmario"
import { GitHubIcon } from "@/components/icons/github"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { ArchitectureDiagramLoader } from "./architecture-diagram-loader"

const techStack = [
  "Docker",
  "Node.js",
  "React.js",
  "TanStack Query",
  "Meilisearch",
  "Postgres",
  "Python",
].sort()

export function OpenMario({ id = "openmario" }: { id?: string }) {
  return (
    <section
      id={id}
      data-project-section={id}
      className="mb-20 scroll-mt-32 border-b border-border/20 pb-20"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
            Project 01
          </div>
          <h2
            className="mb-6 text-3xl font-semibold text-foreground lg:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            OpenMario
          </h2>
          <div className="mx-auto max-w-sm pt-4 lg:mx-0 lg:max-w-none">
            <img
              src="/openmario.png"
              alt="OpenMario"
              className="w-full rounded object-contain"
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.openmario.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 transition-colors duration-200 hover:border-border hover:bg-accent/50"
              aria-label="OpenMario Live"
            >
              <ExternalLink className="h-4 w-4 text-foreground" />
              <span className="text-sm text-foreground">Live</span>
            </a>
            <a
              href="https://github.com/satwikShresth/OpenMario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 transition-colors duration-200 hover:border-border hover:bg-accent/50"
              aria-label="OpenMario GitHub"
            >
              <GitHubIcon className="h-4 w-4 text-foreground" />
              <span className="text-sm text-foreground">GitHub</span>
            </a>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-8">
          <div className="space-y-4 text-base leading-relaxed text-foreground">
            <ul className="list-disc space-y-2 pl-6">
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
                  className="text-primary hover:underline"
                >
                  Reddit post
                </a>
              </li>
              <li>Hosted on my personal VPS</li>
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
