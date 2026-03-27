import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  function toggle() {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      type="button"
      onClick={toggle}
      variant="ghost"
      size="icon-lg"
      aria-label="Toggle theme"
      className="group relative h-11 w-11 rounded-full transition-colors hover:bg-muted/80"
    >
      <Sun className="absolute h-5 w-5 scale-100 rotate-0 text-muted-foreground transition-all group-hover:text-foreground dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 text-muted-foreground transition-all group-hover:text-foreground dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
