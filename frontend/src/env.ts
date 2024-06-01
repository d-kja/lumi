import { z } from "zod";

const envSchema = z.object({
	VITE_BACKEND_URL: z.string().default("http://localhost:4000/api"),
});

const parseEnv = envSchema.safeParse(import.meta.env);

if (!parseEnv.success) {
	const errorMessage = parseEnv.error.format();

	console.error(errorMessage);
	throw new Error("Missing .env file fields!");
}

export const env = parseEnv.data;
