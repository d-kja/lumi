import type { FastifyInstance } from "fastify";

import { listFaturas } from "./list-faturas.controller";
import { createFaturas } from "./create-fatura.controller";
import { summaryFaturas } from "./summary-fatura.controller";
import { downloadFatura } from "./download-fatura.controller";

export const faturaRouter = async (app: FastifyInstance) => {
	app.get("/", listFaturas);
	app.post("/", createFaturas);

	app.get("/:id/download", downloadFatura);
	app.get("/summary", summaryFaturas);
};
