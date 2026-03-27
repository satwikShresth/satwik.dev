import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
	plugins: [
		devtools(),
		nitro({
			preset: "node",
			static: true,
			prerender: {
				autoSubfolderIndex: true,
				concurrency: 1,
				interval: 0,
				failOnError: false,
				crawlLinks: false,
				ignore: [],
				routes: [],
				retry: 3,
				retryDelay: 500,
			},
		}),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart({}),
		viteReact({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
});

export default config;
