import type { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";
import { makeCreateFatura } from "../../factories/faturas/make-create-fatura.factory";

export const createFaturas = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const body = createFaturasSchema.parse(request.body);
	const service = makeCreateFatura();

	const response = await service.handle({
		...body,
		energiaEletrica: {
			valor: body.energiaEletricaValor,
			quantidade: body.energiaEletricaQuantidade,
		},
		energiaCompensada: {
			valor: body.energiaCompensadaValor,
			quantidade: body.energiaCompensadaQuantidade,
		},
		energiaScee: {
			valor: body.energiaSceeValor,
			quantidade: body.energiaSceeQuantidade,
		},
	});

	if (response.isLeft()) throw response.value;

	reply.status(200).send(response.value);
};

const createFaturasSchema = z.object({
	numeroCliente: z.string().min(1, "Numero do cliente é obrigatorio."),
	mesReferencia: z
		.string({ message: "Mes de referencia é obrigatorio." })
		.refine(
			(value) => {
				const isValidPattern = /[A-Za-z]{3}\/[0-9]{4}/.test(value);
				return isValidPattern;
			},
			{ message: "Mes de referencia precisa estar no formato MES/ANO" },
		),
	energiaEletricaValor: z.coerce.number({
		message: "Valor energia eletrica é obrigatorio.",
	}),
	energiaEletricaQuantidade: z.coerce.number({
		message: "Quantidade energia eletrica é obrigatorio.",
	}),
	energiaSceeValor: z.coerce.number({
		message: "Valor energia SCEEE é obrigatorio.",
	}),
	energiaSceeQuantidade: z.coerce.number({
		message: "Quantidade energia SCEEE é obrigatorio.",
	}),
	energiaCompensadaValor: z.coerce.number({
		message: "Valor energia compensada é obrigatorio.",
	}),
	energiaCompensadaQuantidade: z.coerce.number({
		message: "Quantidade energia compensada é obrigatorio.",
	}),
	contribilum: z.coerce.number({ message: "Contrib llum é obrigatorio." }),
	fatura: z.custom<Buffer>(),
});
