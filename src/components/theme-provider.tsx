import { ThemeProviderContext, type Theme } from "@/components/theme-context"
import { useCallback, useEffect, useMemo, useState } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      root.classList.add(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      )
      return
    }

    root.classList.add(theme)
  }, [theme])

  const setThemeValue = useCallback(
    (next: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, next)
      }
      setTheme(next)
    },
    [storageKey],
  )

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeValue,
    }),
    [theme, setThemeValue],
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
