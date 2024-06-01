import { randomUUID } from "node:crypto";
import { writeFile, readFile } from "node:fs/promises";
import { env } from "../env";
import type {
	RetrieveParams,
	Storage,
	UploadParams,
} from "@/domain/faturas/application/storage/storage";

/**
 * Storing files locally, tldr; not using a bucket (to simplify the process)
 *
 * As I'm using dependency inversion it becomes simple to swap
 * this kind of implementation, all that I'd have to do is implement
 * a similar class but using an S3 client instead and replace them in
 * the factories using this class. Pretty simple, right? 😊
 */

export class LocalFileStorage implements Storage {
	private storage_path = env.BUCKET_URL;

	async retrieve({
		url,
	}: RetrieveParams): Promise<{ file: Buffer | undefined }> {
		const path = `${this.storage_path}/${url}`;

		const file = await readFile(path);

		return {
			file,
		};
	}

	async upload({ file, ext }: UploadParams): Promise<{ url: string }> {
		const url = `${randomUUID()}.${ext}`;
		const path = `${this.storage_path}/${url}`;

		await writeFile(path, file);

		return {
			url,
		};
	}
}
