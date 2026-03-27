import HenonRustWorker from "@/lib/workers/henon-rust.worker.ts?worker"
import { useEffect, useRef } from "react"

export function HenonAttractorInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const densityMapRef = useRef<Uint32Array | null>(null)
  const maxDensityRef = useRef(1)
  const imageDataRef = useRef<ImageData | null>(null)
  const currentWidthRef = useRef(0)
  const currentHeightRef = useRef(0)
  const renderAnimationFrameRef = useRef<number | null>(null)
  const workersRef = useRef<Worker[]>([])
  const isDarkRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    function updateDarkMode() {
      isDarkRef.current = document.documentElement.classList.contains("dark")
    }

    function renderFromDensityMap(
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) {
      const densityMap = densityMapRef.current
      const imageData = imageDataRef.current
      if (!densityMap || !imageData) return

      const data = imageData.data
      const isDark = isDarkRef.current
      const r = isDark ? 255 : 20
      const g = isDark ? 255 : 20
      const b = isDark ? 255 : 20

      data.fill(0)

      for (let i = 0; i < densityMap.length; i++) {
        const density = densityMap[i]
        if (density > 0) {
          const normalized = Math.min(density / maxDensityRef.current, 1.0)
          const opacity = Math.floor(80 + normalized ** 0.35 * 175)
          const idx = i * 4
          data[idx] = r
          data[idx + 1] = g
          data[idx + 2] = b
          data[idx + 3] = opacity
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    function scheduleRender(
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) {
      if (renderAnimationFrameRef.current !== null) {
        cancelAnimationFrame(renderAnimationFrameRef.current)
      }
      renderAnimationFrameRef.current = requestAnimationFrame(() => {
        renderFromDensityMap(ctx, width, height)
        renderAnimationFrameRef.current = null
      })
    }

    function mergeDensityIntoMap(batchDensity: Uint32Array) {
      const densityMap = densityMapRef.current
      if (!densityMap) return
      for (let i = 0; i < densityMap.length; i++) {
        if (batchDensity[i] > 0) {
          densityMap[i] = batchDensity[i]
          if (batchDensity[i] > maxDensityRef.current) {
            maxDensityRef.current = batchDensity[i]
          }
        }
      }
    }

    function startParallelGeneration() {
      const c = canvasRef.current
      const cont = containerRef.current
      if (!c || !cont) return

      const aboutSection = document.getElementById("about")
      const experienceSection = document.getElementById("experience")
      if (!aboutSection || !experienceSection) return

      const aboutRect = aboutSection.getBoundingClientRect()
      const experienceRect = experienceSection.getBoundingClientRect()
      const parentRect = cont.parentElement?.getBoundingClientRect()
      if (!parentRect) return

      const top = Math.min(aboutRect.top, experienceRect.top)
      const bottom = Math.max(aboutRect.bottom, experienceRect.bottom)
      const left = Math.min(aboutRect.left, experienceRect.left)
      const right = Math.max(aboutRect.right, experienceRect.right)

      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      const baseWidth = right - left
      const baseHeight = bottom - top

      const paddingX = Math.max(300, viewportWidth * 0.2)
      const paddingTop = Math.max(300, viewportHeight * 0.15)
      const paddingBottom = Math.max(800, viewportHeight * 0.5)

      const width = Math.max(
        viewportWidth,
        Math.floor(baseWidth + paddingX * 2),
      )
      const height = Math.max(
        viewportHeight * 2,
        Math.floor(baseHeight + paddingTop + paddingBottom),
      )

      const topOffset = top - parentRect.top - paddingTop
      const leftOffset = left - parentRect.left - paddingX

      if (baseWidth === 0 || baseHeight === 0) return

      currentWidthRef.current = width
      currentHeightRef.current = height

      cont.style.top = `${topOffset}px`
      cont.style.left = `${leftOffset}px`
      cont.style.width = `${width}px`
      cont.style.height = `${height}px`
      cont.style.overflow = "visible"
      cont.style.maxWidth = "none"
      cont.style.maxHeight = "none"

      c.width = width
      c.height = height

      const ctx = c.getContext("2d", { alpha: true })
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      densityMapRef.current = new Uint32Array(width * height)
      maxDensityRef.current = 1
      imageDataRef.current = ctx.createImageData(width, height)

      for (const w of workersRef.current) {
        w.postMessage({ type: "stop" })
        w.terminate()
      }
      workersRef.current = []

      const worker = new HenonRustWorker()
      const seed = 1

      worker.onmessage = (e: MessageEvent) => {
        const { type } = e.data as { type: string }

        if (type === "batch") {
          const { density: batchDensity } = e.data as {
            density: ArrayBuffer
          }
          if (batchDensity && densityMapRef.current) {
            const arr = new Uint32Array(batchDensity)
            mergeDensityIntoMap(arr)
            if (ctx && imageDataRef.current) {
              scheduleRender(ctx, width, height)
            }
          }
        } else if (type === "complete") {
          const { density: finalDensity, maxDensity: finalMax } = e.data as {
            density: ArrayBuffer
            maxDensity: number
          }
          if (finalDensity && densityMapRef.current) {
            const finalDensityArray = new Uint32Array(finalDensity)
            const dm = densityMapRef.current
            for (let i = 0; i < dm.length; i++) {
              dm[i] = finalDensityArray[i]
            }
            maxDensityRef.current = finalMax
            if (ctx && imageDataRef.current) {
              renderFromDensityMap(ctx, width, height)
            }
          }
          workersRef.current = []
        } else if (type === "error") {
          console.error("Worker error:", (e.data as { error: string }).error)
          workersRef.current = []
        }
      }

      worker.onerror = (error) => {
        console.error("Worker error:", error)
        workersRef.current = []
      }

      workersRef.current.push(worker)

      worker.postMessage({
        type: "start",
        width,
        height,
        seed,
        isDark: isDarkRef.current,
      })
    }

    updateDarkMode()

    const observer = new MutationObserver(() => {
      const wasDark = isDarkRef.current
      updateDarkMode()
      if (wasDark !== isDarkRef.current && canvasRef.current && containerRef.current) {
        startParallelGeneration()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const t = window.setTimeout(() => {
      startParallelGeneration()
    }, 100)

    function handleResize() {
      startParallelGeneration()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.clearTimeout(t)
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
      if (renderAnimationFrameRef.current !== null) {
        cancelAnimationFrame(renderAnimationFrameRef.current)
      }
      for (const w of workersRef.current) {
        w.postMessage({ type: "stop" })
        w.terminate()
      }
      workersRef.current = []
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="block bg-transparent w-full h-full"
        style={{ display: "block", background: "transparent", width: "100%", height: "100%" }}
      />
    </div>
  )
}
