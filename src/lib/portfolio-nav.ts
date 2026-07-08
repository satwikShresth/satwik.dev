/** Top-level section nav targets. */
export const MAIN_SECTION_IDS = [
  "experience",
  "projects",
  "offtheclock",
] as const

export type MainSectionId = (typeof MAIN_SECTION_IDS)[number]

export const EXPERIENCE_ANCHOR_IDS = [
  "sharing-excess",
  "sig",
  "opex",
  "drexel-ta",
] as const

export const PROJECT_ANCHOR_IDS = [
  "openmario",
  "inspiration",
  "shelved",
  "personal-website",
] as const

export const OFF_THE_CLOCK_ANCHOR_IDS = [
  "offtheclock-hikes",
  "offtheclock-runs",
  "offtheclock-rides",
] as const

export function setPortfolioHash(id: string) {
  const next = id.startsWith("#") ? id : `#${id}`
  window.history.pushState(
    null,
    "",
    `${window.location.pathname}${window.location.search}${next}`,
  )
}
