import { Right, type Either } from "@/core/errors/either";
import type { FaturaRepository } from "../repositories/fatura.repository";
import type { UnknownObject } from "@/core/types/helpers";
import type { Fatura } from "../../enterprise/entities/fatura.entity";

export type ListFaturasResponse = Either<UnknownObject, Fatura[]>;

export class ListFaturasService {
	constructor(private faturaRepository: FaturaRepository) {}

	async handle(): Promise<ListFaturasResponse> {
		const data = await this.faturaRepository.findMany();
		return Right.new(data);
	}
}
