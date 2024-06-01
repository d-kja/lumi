import { DownloadFaturaService } from "@/domain/faturas/application/use-cases/download-fatura.service";
import { FaturaPrismaRepository } from "@/infra/repositories/prisma/fatura-prisma.repository";
import { LocalFileStorage } from "@/infra/storage/file-storage";

export const makeDownloadFatura = () => {
	const repository = new FaturaPrismaRepository();
	const storage = new LocalFileStorage();
	const service = new DownloadFaturaService(repository, storage);

	return service;
};
