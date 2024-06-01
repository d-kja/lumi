export interface Storage {
	retrieve: (params: RetrieveParams) => Promise<{ file: Buffer | undefined }>;
	upload: (params: UploadParams) => Promise<{ url: string }>;
}

export type UploadParams = {
	file: Buffer;
	ext: string;
};

export type RetrieveParams = {
	url: string;
};
