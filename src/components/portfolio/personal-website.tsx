import { ProjectSection } from "./project-section"

const techStack = [
  "Chakra UI",
  "GitHub Actions",
  "Next.js",
  "React",
  "TanStack Query",
  "TypeScript",
]

export function PersonalWebsiteSection({
  id = "personal-website",
}: {
  id?: string
}) {
  return (
    <ProjectSection
      id={id}
      title="satwik.dev"
      links={[
        { href: "https://satwik.dev", label: "Live" },
        {
          href: "https://github.com/satwikShresth/satwik.dev",
          label: "GitHub",
          primary: false,
        },
      ]}
      techStack={techStack}
      bordered={false}
    >
      <ul className="space-y-1">
        <li>
          100% client-side playground for full-text and tag-searchable blog
          posts
        </li>
        <li>
          Born as therapy for runaway hot takes — no courses, no paywalls, just
          unfiltered opinions and occasional flashes of genius
        </li>
      </ul>
    </ProjectSection>
  )
}
