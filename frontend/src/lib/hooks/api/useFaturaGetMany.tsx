import type { FaturaModel } from "@/@types/models/fatura";
import { AxiosError } from "axios";

import { api } from "@/lib/api/api-handler";
import { apiRoutes } from "@/lib/api/api-routes";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const FATURA_GET_MANY_STALE_TIME = 1000 * 60 * 10;
export const FATURA_GET_MANY_QUERY_KEY = "@fatura/get-many";

export const useFaturaGetMany = () => {
	const queryFn = async () => {
		try {
			const request = await api().get<FaturaModel[]>(apiRoutes.listFaturas);

			return request.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				switch (err.message) {
					case "Network Error": {
						toast.error("Não foi possivel buscar os dados.");
						break;
					}
					default: {
						toast.error(err.message);
						break;
					}
				}
			}
		}
	};

	const {
		data: faturas,
		isLoading: isFaturaGetManyLoading,
		refetch: faturaGetManyRefetch,
	} = useQuery({
		queryFn,
		queryKey: [FATURA_GET_MANY_QUERY_KEY],
		staleTime: FATURA_GET_MANY_STALE_TIME,
	});

	return {
		faturas,
		faturaGetManyRefetch,
		isFaturaGetManyLoading,
	};
};
