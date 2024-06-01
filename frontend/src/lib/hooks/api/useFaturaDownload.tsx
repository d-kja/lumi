import { api } from "@/lib/api/api-handler";
import { apiRoutes } from "@/lib/api/api-routes";
import { downloadFile } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useFaturaDownload = () => {
	const mutationFn = async (id: string) => {
		const request = await api().get<FaturaDownloadResponse>(
			apiRoutes.downloadFatura(id),
		);
		const buffer = request.data?.file?.data;
		downloadFile("fatura.pdf", buffer);
	};

	const { mutate: downloadFatura, isPending: isDownloadFaturaLoading } =
		useMutation({
			mutationFn,
			onSuccess: async () => {
				toast.info("Començando download da fatura");
			},
			onError: (error: AxiosError<{ message: string }>) =>
				toast.error(error.response?.data?.message ?? error.message),
		});

	return {
		downloadFatura,
		isDownloadFaturaLoading,
	};
};

type FaturaDownloadResponse = {
	file: {
		data: Buffer;
	};
};
