import type { FaturaRepository } from "../repositories/fatura.repository";
import { Fatura } from "../../enterprise/entities/fatura.entity";

import { Right, type Either } from "@/core/errors/either";
import type { InvalidInputError } from "@/core/errors/default/invalid-input.error";
import type { Storage } from "../storage/storage";

export type CreateFaturaRequest = {
	numeroCliente: string;
	mesReferencia: string;
	energiaEletrica: {
		quantidade: number;
		valor: number;
	};
	energiaScee: {
		quantidade: number;
		valor: number;
	};
	energiaCompensada: {
		quantidade: number;
		valor: number;
	};
	contribilum: number;
	fatura: Buffer;
};

export type CreateFaturaResponse = Either<InvalidInputError, Fatura>;

export class CreateFaturaService {
	constructor(
		private faturaRepository: FaturaRepository,
		private storage: Storage,
	) {}

	async handle(props: CreateFaturaRequest): Promise<CreateFaturaResponse> {
		const requestData = Fatura.create(props);

		if (requestData.isLeft()) return requestData;

		const { url } = await this.storage.upload({
			file: props.fatura,
			ext: "pdf",
		});

		requestData.value.faturaURL = url;
		const fatura = await this.faturaRepository.create(requestData.value);

		return Right.new(fatura);
	}
}
