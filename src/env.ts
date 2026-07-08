import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_URL: z.url().optional(),
		COROS_EMAIL: z.string().min(1).optional(),
		COROS_PASSWORD: z.string().min(1).optional(),
		/** Hours before a visit may trigger a COROS refresh. Default: 24. */
		ACTIVITY_CACHE_TTL_HOURS: z.coerce.number().int().positive().default(24),
	},

	clientPrefix: "VITE_",

	client: {
		VITE_PUBLIC_S3_INSP_VIDEO: z.url().optional(),
	},

	runtimeEnv: {
		SERVER_URL: process.env.SERVER_URL,
		COROS_EMAIL: process.env.COROS_EMAIL,
		COROS_PASSWORD: process.env.COROS_PASSWORD,
		ACTIVITY_CACHE_TTL_HOURS: process.env.ACTIVITY_CACHE_TTL_HOURS,
		VITE_PUBLIC_S3_INSP_VIDEO: import.meta.env.VITE_PUBLIC_S3_INSP_VIDEO,
	},
	skipValidation: typeof window !== "undefined",
	emptyStringAsUndefined: true,
});
