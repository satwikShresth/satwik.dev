import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	server: {
		watch: {
			ignored: ["**/data/**"],
		},
	},
	plugins: [
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		tanstackStart({
			spa: {
				enabled: true,
				prerender: {
					enabled: true,
				},
			},
		}),
		viteReact({ include: /\.(jsx|js|tsx|ts)$/ }),
	],
});

export default config;
