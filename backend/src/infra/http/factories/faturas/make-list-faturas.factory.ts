import { ListFaturasService } from "@/domain/faturas/application/use-cases/list-faturas.service";
import { FaturaPrismaRepository } from "@/infra/repositories/prisma/fatura-prisma.repository";

export const makeListFaturas = () => {
	const repository = new FaturaPrismaRepository();
	const service = new ListFaturasService(repository);

	return service;
};
