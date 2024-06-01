import type {
	RetrieveParams,
	Storage,
	UploadParams,
} from "@/domain/faturas/application/storage/storage";
import { randomUUID } from "node:crypto";

export class InMemoryStorage implements Storage {
	storage: StorageFile[] = [];

	async retrieve({
		url,
	}: RetrieveParams): Promise<{ file: Buffer | undefined }> {
		return {
			file: this.storage.find((item) => item.url === url)?.file,
		};
	}

	async upload({ file }: UploadParams): Promise<{ url: string }> {
		const url = randomUUID();

		this.storage.push({
			url,
			file,
		});

		return {
			url,
		};
	}
}

type StorageFile = {
	url: string;
	file: Buffer;
};
