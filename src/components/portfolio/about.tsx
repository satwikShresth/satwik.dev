import { LinkedInIcon } from "@/components/icons/linkedin"
import { Button } from "@/components/ui/button"
import { FileText, Mail } from "lucide-react"

export function About({ id = "about" }: { id?: string }) {
  return (
    <section
      id={id}
      data-project-section={id}
      className="relative mb-20 scroll-mt-32 border-b border-border/20 pb-20"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-8 lg:flex lg:flex-col lg:justify-center">
          <div className="space-y-4 text-base leading-relaxed text-foreground">
            <h3 className="text-lg font-medium">I like to code</h3>
            <p>
              Check out my{" "}
              <a href="#openmario" className="text-primary hover:underline">
                projects
              </a>
              ,{" "}
              <a href="#experience" className="text-primary hover:underline">
                experiences
              </a>
              , etc....
            </p>
            <p className="text-base md:text-lg">
              Lately, I have been focusing on{" "}
              <span className="text-muted-foreground/50 line-through">
                creating full stack web applications that deliver end-to-end
                solutions while maintaining high performance, scalability, and
                clean architecture
              </span>{" "}
              hiking, climbing & exploring national parks.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="outline" aria-label="Resume">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText />
                  Resume
                </a>
              </Button>
              <Button asChild variant="outline" aria-label="Email">
                <a href="mailto:satwik.shresth@gmail.com">
                  <Mail />
                  Email
                </a>
              </Button>
              <Button asChild variant="outline" aria-label="LinkedIn">
                <a
                  href="https://linkedin.com/in/satwik-shresth/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-center">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/my_photo.png"
              alt="Satwik Shresth"
              className="h-[180px] w-[180px] rounded-lg object-cover shadow-lg sm:h-[280px] sm:w-[280px] lg:h-auto lg:w-full lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
