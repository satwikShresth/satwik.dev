import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const IMAGE_DIR = path.join(process.cwd(), "public", "hikes")

function resolveImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }

  return `https://t.coros.com${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
}

export async function saveHikeImage(
  id: string,
  imageUrl: string,
): Promise<string | null> {
  if (!imageUrl) return null

  try {
    const response = await fetch(resolveImageUrl(imageUrl))
    if (!response.ok) return null

    const contentType = response.headers.get("content-type") ?? "image/jpeg"
    if (!contentType.startsWith("image/")) return null

    await mkdir(IMAGE_DIR, { recursive: true })
    const extension = contentType.includes("png") ? "png" : "jpg"
    const filePath = path.join(IMAGE_DIR, `${id}.${extension}`)
    await writeFile(filePath, Buffer.from(await response.arrayBuffer()))
    return `/hikes/${id}.${extension}`
  } catch {
    return null
  }
}
