import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { env } from "./infra/env";

import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import Fastify from "fastify";

import { router } from "./infra/http/router";

const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * 10; // 10 MB

export const server = Fastify({
	logger: true,
});

server.register(cors, {
	origin: "*",
});
server.register(multipart, {
	limits: {
		files: 1,
		fileSize: MAX_FILE_SIZE_IN_BYTES,
		fieldNameSize: 100,
		fieldSize: 100,
		fields: 10,
		headerPairs: 2000,
		parts: 1000,
	},
	attachFieldsToBody: "keyValues",
});

server.register(router, { prefix: "/api" });

server.setErrorHandler((err, _, reply) => {
	if (err instanceof ZodError) {
		return reply.status(400).send({
			message: fromError(err, {
				prefix: "Erro de validação",
				includePath: false,
			}).toString(),
		});
	}

	switch (env.NODE_ENV) {
		case "production": {
			// LOGGER
			break;
		}
		default: {
			console.error(err);
			break;
		}
	}

	const message = err.message?.length
		? err.message
		: "Houve um problema no servidor.";
	return reply.status(500).send({ message });
});
