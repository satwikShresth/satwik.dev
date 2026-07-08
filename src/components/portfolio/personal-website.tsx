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
        <li>Client-side blog with full-text and tag search</li>
        <li>Older personal site — mostly essays and notes</li>
      </ul>
    </ProjectSection>
  )
}
