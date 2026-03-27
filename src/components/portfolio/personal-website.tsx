import { GitHubIcon } from "@/components/icons/github"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

const techStack = [
  "TypeScript",
  "React.js",
  "Next.js",
  "TanStack Query",
  "Chakra UI",
  "CI/CD",
  "GitHub Actions",
].sort()

export function PersonalWebsiteSection({ id = "personal-website" }: { id?: string }) {
  return (
    <section
      id={id}
      data-project-section={id}
      className="mb-20 scroll-mt-32 border-b border-border/20 pb-20"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
            Project 04
          </div>
          <h2
            className="mb-6 text-3xl font-semibold text-foreground lg:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Personal Website
          </h2>
          <div className="mx-auto max-w-sm pt-4 lg:mx-0 lg:max-w-none">
            <img
              src="/android-chrome-512x512.png"
              alt="Personal Website"
              className="w-full rounded object-contain"
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://satwik.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 transition-colors duration-200 hover:border-border hover:bg-accent/50"
              aria-label="Personal Website Live"
            >
              <ExternalLink className="h-4 w-4 text-foreground" />
              <span className="text-sm text-foreground">Live</span>
            </a>
            <a
              href="https://github.com/satwikShresth/satwik.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 transition-colors duration-200 hover:border-border hover:bg-accent/50"
              aria-label="Personal Website GitHub"
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
                A 100% client‑side playground for digging through my half‑baked
                blogs via full‑text or tag searches
              </li>
              <li>
                Born as therapy for my runaway hot takes—so I can&apos;t lose my
                own brilliant (and not‑so‑brilliant) ideas
              </li>
              <li>No courses, no paywalls—just unfiltered opinions and unsolicited wisdom</li>
              <li>
                Also doubles as a humble shrine to my ramblings and occasional
                flashes of genius
              </li>
            </ul>
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
