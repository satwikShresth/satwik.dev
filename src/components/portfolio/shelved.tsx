import { ProjectSection } from "./project-section"

const techStack = ["Deno", "Docker", "EJS", "JavaScript", "Knex.js", "Postgres"]

export function Shelved({ id = "shelved" }: { id?: string }) {
  return (
    <ProjectSection
      id={id}
      title="Shelved"
      links={[
        { href: "https://shelved.satwik.dev", label: "Live" },
        {
          href: "https://github.com/satwikShresth/shelved",
          label: "GitHub",
          primary: false,
        },
      ]}
      techStack={techStack}
    >
      <ul className="space-y-1">
        <li>
          Group project mastering raw JavaScript — SSR, DOM manipulation, social
          features including friends, following, and private collections
        </li>
        <li>
          Strategy pattern across multiple content APIs. Built entirely on Deno
          without bundling
        </li>
      </ul>
    </ProjectSection>
  )
}
