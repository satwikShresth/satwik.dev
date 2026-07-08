import { ProjectSection } from "./project-section"

const techStack = ["React", "Tailwind", "TanStack Start", "TypeScript"]

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
      <p>New personal site built with TanStack Start.</p>
    </ProjectSection>
  )
}
