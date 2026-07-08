import { TechTags } from "@/components/portfolio/tech-tags"
import { HashLink } from "@/components/portfolio/hash-link"
import { cn } from "@/lib/utils"

const experiences = [
  {
    id: "sharing-excess",
    company: "Sharing Excess",
    location: "Philadelphia, PA",
    position: "Software Engineer",
    period: "July 2025 – Present",
    summary: [
      "React and TypeScript PWA for field logistics data. Migrated legacy JS to TypeScript and Express to oRPC.",
      "Playwright tests in CI. Database work for donation and redistribution workflows.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "PWA",
      "oRPC",
      "Playwright",
      "CI/CD",
    ],
  },
  {
    id: "sig",
    company: "Susquehanna International Group",
    location: "Bala Cynwyd, PA",
    position: "Software Engineer Co-op",
    period: "Sep 2023 – Mar 2024",
    summary: [
      "C++ metrics publisher tailing log files for protocol monitoring. Python layer with C++ bindings feeding Grafana dashboards.",
      "Kafka consumer for batch processing large message backlogs.",
    ],
    technologies: [
      "C++",
      "Python",
      "Kafka",
      "FastAPI",
      "Kubernetes",
      "Grafana",
    ],
  },
  {
    id: "opex",
    company: "OPEX Corporation",
    location: "Moorestown, NJ",
    position: "Software Engineer Co-op",
    period: "Sep 2022 – Mar 2023",
    summary: [
      "Windows IPC between C++ apps using an internal protocol.",
      "Python tooling to integrate Windows help files into a C++ MFC app.",
    ],
    technologies: ["C++", "Python", "Windows IPC", "Doxygen", "Robotics"],
  },
  {
    id: "drexel-ta",
    company: "Drexel University",
    location: "College of Computing & Informatics",
    position: "Teaching Assistant",
    period: "Sep 2022 – Mar 2025",
    summary: [
      "TA for weekly labs and office hours. Built a small grading script in Python and JavaScript.",
    ],
    technologies: ["Python", "JavaScript", "Mentoring"],
  },
]

export function Experience({ id = "experience" }: { id?: string }) {
  return (
    <section id={id} data-section={id} className="scroll-mt-24">
      <div className="section-label flex items-center gap-2">
        <span>Experience</span>
        <HashLink id={id} label="Copy link to experience" />
      </div>

      {experiences.map((experience, index) => (
        <div
          key={experience.company + experience.period}
          id={experience.id}
          data-section={experience.id}
          className={cn(
            "scroll-mt-24",
            index > 0 && "mt-8",
            index < experiences.length - 1 &&
              "border-b border-[var(--brd)] pb-6",
          )}
        >
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <h3 className="flex items-center gap-2 font-serif-display text-2xl text-foreground">
              <span>{experience.position}</span>
              <HashLink id={experience.id} label={`Copy link to ${experience.company}`} />
            </h3>
            <div className="shrink-0 font-mono-label text-[length:var(--type-label)] text-muted-foreground">
              {experience.period}
            </div>
          </div>
          <div className="mb-2.5 font-mono-label text-[length:var(--type-label)] tracking-[0.04em] text-primary uppercase">
            {experience.company} · {experience.location}
          </div>
          <div className="mb-3 space-y-2 text-[length:var(--type-body)] leading-[1.7] text-foreground/92">
            {experience.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <TechTags tags={experience.technologies} />
        </div>
      ))}
    </section>
  )
}
