import { Left, Right, type Either } from "@/core/errors/either";
import type { FaturaRepository } from "../repositories/fatura.repository";
import { ResourceNotFoundError } from "@/core/errors/default/resource-not-found.error";
import type { Storage } from "../storage/storage";
import type { EntityId } from "@/core/entities/value-objects/entity-id";

export type DownloadFaturaRequest = {
	id: EntityId;
};
export type DownloadFaturaResponse = Either<
	ResourceNotFoundError,
	{
		file: Buffer;
	}
>;

export class DownloadFaturaService {
	constructor(
		private faturaRepository: FaturaRepository,
		private storage: Storage,
	) {}

	async handle({ id }: DownloadFaturaRequest): Promise<DownloadFaturaResponse> {
		const data = await this.faturaRepository.findById(id);
		const url = data?.faturaURL;

		if (!data || !url) return Left.new(new ResourceNotFoundError());

		const { file } = await this.storage.retrieve({
			url,
		});

		if (!file) return Left.new(new ResourceNotFoundError());

		return Right.new({
			file,
		});
	}
}
