/** Section ids under the projects block (hash targets #openmario, #inspiration, …). */
export const PROJECT_SECTION_IDS = [
  "openmario",
  "inspiration",
  "shelved",
  "personal-website",
] as const

export type ProjectSectionId = (typeof PROJECT_SECTION_IDS)[number]

export const PROJECT_SECTION_LABELS: Record<ProjectSectionId, string> = {
  openmario: "OpenMario",
  inspiration: "Inspiration",
  shelved: "Shelved",
  "personal-website": "Personal Website",
}

/** All in-page hash targets for the portfolio home route. */
export const PORTFOLIO_HASH_IDS = [
  "about",
  "experience",
  "projects",
  ...PROJECT_SECTION_IDS,
] as const

export function isPortfolioHashId(id: string): boolean {
  return (PORTFOLIO_HASH_IDS as readonly string[]).includes(id)
}

export function isProjectsAreaActive(activeSection: string): boolean {
  return (
    activeSection === "projects" ||
    (PROJECT_SECTION_IDS as readonly string[]).includes(activeSection)
  )
}

export function setPortfolioHash(id: string) {
  const next = id.startsWith("#") ? id : `#${id}`
  window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${next}`)
}
