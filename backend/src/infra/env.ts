import { z } from "zod";

export const envSchema = z.object({
	NODE_ENV: z.enum(["production", "development", "test"]).default("production"),
	PORT: z.coerce.number().default(4000),
	SERVER_HOST: z.string().default("0.0.0.0"),

	// DATABASE CONNECTION
	DATABASE_URL: z.string(),
	BUCKET_URL: z.string().default("storage"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	const errorMessage = "Unable to read ENV file properly, missing variables.";

	console.error(_env.error.format());
	throw new Error(errorMessage);
}

export const env = _env.data;
