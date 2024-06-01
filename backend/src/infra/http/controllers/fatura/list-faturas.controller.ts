import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListFaturas } from "../../factories/faturas/make-list-faturas.factory";
import { FaturaPresenter } from "../../presenters/fatura.presenter";

export const listFaturas = async (_: FastifyRequest, reply: FastifyReply) => {
	const service = makeListFaturas();
	const response = await service.handle();

	if (response.isLeft()) {
		return reply.status(400).send(response.value);
	}

	const faturas = response.value.map(FaturaPresenter.toHTPP);

	reply.status(200).send(faturas);
};
