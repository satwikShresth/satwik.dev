import { useEffect, useRef } from "react"

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "")
  if (!id) return

  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ block: "start" })
  })
}

export function usePortfolioHashScroll() {
  const initialScrollDone = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    if (!initialScrollDone.current && window.location.hash) {
      initialScrollDone.current = true
      scrollToHash(window.location.hash)
    }

    const onHashChange = () => scrollToHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)

    return () => {
      window.removeEventListener("hashchange", onHashChange)
      window.history.scrollRestoration = previous
    }
  }, [])
}
