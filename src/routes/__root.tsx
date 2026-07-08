import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider"

import appCss from "../styles.css?url"

import type { QueryClient } from "@tanstack/react-query"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Satwik Shresth - I like to code",
      },
      {
        name: "description",
        content:
          "Satwik Shresth — software engineer in Philadelphia. Work, projects, and the rest.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";if(t==="system"){t=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add("dark")}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <TanStackQueryProvider>{children}</TanStackQueryProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
