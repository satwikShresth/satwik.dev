import { GitHubIcon } from "@/components/icons/github"
import { LinkedInIcon } from "@/components/icons/linkedin"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Satwik Shresth. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              className="group h-11 w-11 rounded-full transition-colors hover:bg-muted/80"
            >
              <a
                href="https://github.com/satwikShresth/satwik.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-full items-center justify-center"
              >
                <GitHubIcon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              className="group h-11 w-11 rounded-full transition-colors hover:bg-muted/80"
            >
              <a
                href="https://linkedin.com/in/satwik-shresth/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-full items-center justify-center"
              >
                <LinkedInIcon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              className="group h-11 w-11 rounded-full transition-colors hover:bg-muted/80"
            >
              <a
                href="mailto:satwik.shresth@gmail.com"
                aria-label="Email"
                className="flex size-full items-center justify-center"
              >
                <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
