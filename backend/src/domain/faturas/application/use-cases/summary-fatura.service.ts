import { Right, type Either } from "@/core/errors/either";
import type { FaturaRepository } from "../repositories/fatura.repository";

export type SummaryFaturaRequest = {
	numeroCliente: string;
};
export type SummaryFaturaResponse = Either<null, Record<string, SummaryType[]>>;

export class SummaryFaturasService {
	constructor(private faturaRepository: FaturaRepository) {}

	async handle({
		numeroCliente,
	}: SummaryFaturaRequest): Promise<SummaryFaturaResponse> {
		const data = await this.faturaRepository.findMany({ numeroCliente });

		const summary = data.reduce<Record<string, SummaryType[]>>((acc, item) => {
			if (!acc[item.mesReferencia]) {
				acc[item.mesReferencia] = [];
			}

			const clientSummary: SummaryType = {
				consumoEnergiaEletrica:
					item.energiaEletrica.quantidade + item.energiaScee.quantidade,
				energiaCompensada: item.energiaCompensada.quantidade,
				totalSemGD:
					Number(item.energiaEletrica.valor) +
					Number(item.energiaScee.valor) +
					Number(item.contriblum),
				economiaGD: Number(item.energiaCompensada.valor),
				numeroCliente: item.numeroCliente,
			};

			acc[item.mesReferencia].push(clientSummary);

			return acc;
		}, {});

		return Right.new(summary);
	}
}

type SummaryType = {
	numeroCliente: string;
	consumoEnergiaEletrica: number;
	energiaCompensada: number;
	totalSemGD: number;
	economiaGD: number;
};
