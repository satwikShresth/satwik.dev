import { createFileRoute } from "@tanstack/react-router"
import { readActivityImage } from "@/lib/coros/images"

export const Route = createFileRoute("/hikes/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const fileName = params._splat
        if (!fileName) {
          return new Response(null, { status: 404 })
        }

        const image = await readActivityImage(fileName)
        if (!image) {
          return new Response(null, { status: 404 })
        }

        return new Response(image.data, {
          headers: {
            "Content-Type": image.contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        })
      },
    },
  },
})
