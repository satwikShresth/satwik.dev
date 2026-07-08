import { useTheme } from "@/components/use-theme"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const nextDark = !document.documentElement.classList.contains("dark")
    setTheme(nextDark ? "dark" : "light")
    setIsDark(nextDark)
  }

  return (
    <Button
      type="button"
      onClick={toggle}
      variant="outline"
      size="sm"
      className="ml-1 h-auto rounded-[2px] border-[var(--subtle)] bg-transparent px-3 py-1 font-mono-label text-[9px] tracking-[0.05em] text-muted-foreground hover:border-foreground hover:text-foreground"
    >
      {isDark ? "☀ Light" : "◑ Dark"}
    </Button>
  )
}
