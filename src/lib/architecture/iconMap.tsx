import type { LucideIcon } from "lucide-react"
import {
  BarChart,
  Bell,
  Box,
  Cloud,
  Code,
  Database,
  FileText,
  HardDrive,
  Layers,
  Search,
  Server,
  Settings,
} from "lucide-react"

export const iconMap: Record<string, LucideIcon> = {
  react: Code,
  docker: Box,
  database: Database,
  server: Server,
  search: Search,
  cloud: Cloud,
  python: Code,
  file: FileText,
  filealt: FileText,
  chart: BarChart,
  chartline: BarChart,
  bell: Bell,
  stream: Layers,
  cog: Settings,
  settings: Settings,
  storage: HardDrive,
}

export function getIcon(name: string): LucideIcon | null {
  return iconMap[name.toLowerCase()] ?? null
}
