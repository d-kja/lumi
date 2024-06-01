import type { FastifyReply, FastifyRequest } from "fastify";
import { makeSummaryFatura } from "../../factories/faturas/make-summary-fatura.factory";

export const summaryFaturas = async (
	request: FastifyRequest<{ Querystring: { numeroCliente: string } }>,
	reply: FastifyReply,
) => {
	const numeroCliente = request.query.numeroCliente;

	const service = makeSummaryFatura();
	const response = await service.handle({
		numeroCliente,
	});

	if (response.isLeft()) {
		return reply.status(400).send(response.value);
	}

	const faturasSummary = response.value;

	reply.status(200).send(faturasSummary);
};
