import {defineConfig} from 'nitro'
export default defineConfig({
	preset:'node',
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
		retryDelay: 500
	}
})
