import { SummaryFaturasService } from "@/domain/faturas/application/use-cases/summary-fatura.service";
import { FaturaPrismaRepository } from "@/infra/repositories/prisma/fatura-prisma.repository";

export const makeSummaryFatura = () => {
	const repository = new FaturaPrismaRepository();
	const service = new SummaryFaturasService(repository);

	return service;
};
