import type { FastifyReply, FastifyRequest } from "fastify";
import { EntityId } from "@/core/entities/value-objects/entity-id";
import { makeDownloadFatura } from "../../factories/faturas/make-download-fatura.factory";
import { z } from "zod";

export const downloadFatura = async (
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) => {
	const { id } = downloadFaturaSchema.parse(request.params);

	const service = makeDownloadFatura();
	const response = await service.handle({
		id: EntityId.new(id),
	});

	if (response.isLeft()) {
		return reply.status(400).send(response.value);
	}

	const fatura = response.value;

	reply.status(200).send(fatura);
};

const downloadFaturaSchema = z.object({
	id: z.string().uuid("ID invalido"),
});
