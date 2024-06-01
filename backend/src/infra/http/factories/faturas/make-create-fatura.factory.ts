import { CreateFaturaService } from "@/domain/faturas/application/use-cases/create-fatura.service";
import { FaturaPrismaRepository } from "@/infra/repositories/prisma/fatura-prisma.repository";
import { LocalFileStorage } from "@/infra/storage/file-storage";

export const makeCreateFatura = () => {
	const repository = new FaturaPrismaRepository();
	const storage = new LocalFileStorage();
	const service = new CreateFaturaService(repository, storage);

	return service;
};
