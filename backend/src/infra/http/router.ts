import type { FastifyInstance } from "fastify";

import { faturaRouter } from "./controllers/fatura/fatura.router";

export const router = async (app: FastifyInstance) => {
	app.register(faturaRouter, { prefix: "/fatura" });
};
