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
          Group project in plain JavaScript — SSR, basic social features, private
          collections
        </li>
        <li>
          Multiple content APIs behind a strategy pattern. Runs on Deno without a
          bundler
        </li>
      </ul>
    </ProjectSection>
  )
}
