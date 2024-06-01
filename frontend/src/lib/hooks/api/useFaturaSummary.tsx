import type { FaturasSummary } from "@/@types/fatura-summary";
import { AxiosError } from "axios";

import { api } from "@/lib/api/api-handler";
import { apiRoutes } from "@/lib/api/api-routes";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const FATURA_GET_MANY_STALE_TIME = 1000 * 60 * 10;
export const FATURA_SUMMARY_QUERY_KEY = "@fatura/summary";

export const useFaturaSummary = ({
	numeroCliente = "",
}: FaturaSummaryRequest) => {
	const queryFn = async () => {
		try {
			const request = await api().get<FaturasSummary>(apiRoutes.summaryFatura, {
				params: {
					numeroCliente,
				},
			});

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
		queryKey: [FATURA_SUMMARY_QUERY_KEY, numeroCliente],
		staleTime: FATURA_GET_MANY_STALE_TIME,
	});

	return {
		faturas,
		faturaGetManyRefetch,
		isFaturaGetManyLoading,
	};
};

type FaturaSummaryRequest = {
	numeroCliente?: string;
};
