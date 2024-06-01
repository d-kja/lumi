import type { FaturaModel } from "@/@types/models/fatura";
import type { AxiosError } from "axios";

import { api, getMultipartHeader, queryClient } from "@/lib/api/api-handler";
import { apiRoutes } from "@/lib/api/api-routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FATURA_GET_MANY_QUERY_KEY } from "./useFaturaGetMany";
import { FATURA_SUMMARY_QUERY_KEY } from "./useFaturaSummary";

const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

export const useFaturaCreate = () => {
	const navigate = useNavigate();

	const mutationFn = async (data: FaturaCreateType) => {
		const request = await api({
			headers: getMultipartHeader(),
		}).post<FaturaModel[]>(apiRoutes.createFatura, data);

		return request.data;
	};

	const { mutate: createFatura, isPending: isCreateFaturaLoading } =
		useMutation({
			mutationFn,
			onSuccess: async () => {
				toast.info("Fatura criada com sucesso!");

				await queryClient.invalidateQueries({
					queryKey: [FATURA_GET_MANY_QUERY_KEY],
					exact: false,
				});
				await queryClient.invalidateQueries({
					queryKey: [FATURA_SUMMARY_QUERY_KEY],
					exact: false,
				});

				navigate({ to: "/fatura" });
			},
			onError: (error: AxiosError<{ message: string }>) =>
				toast.error(error.response?.data?.message ?? error.message),
		});

	const form = useForm<FaturaCreateType>({
		resolver: zodResolver(faturaCreateSchema),
		reValidateMode: "onSubmit",
	});

	return {
		createFatura,
		isCreateFaturaLoading,
		form,
	};
};

const faturaCreateSchema = z.object({
	fatura: z.custom<Blob>().refine(
		(blob) => {
			if (!blob) {
				toast.warning("PDF Não foi carregado.");
				return false;
			}

			const isTypeValid = ACCEPTED_IMAGE_TYPES.includes(blob?.type);

			if (!isTypeValid)
				toast.warning("Apenas arquivos do tipo PDF podem ser selecionados.");

			return isTypeValid;
		},
		{ message: "Apenas arquivos do tipo PDF podem ser selecionados." },
	),
	numeroCliente: z.string().min(1, "Numero do cliente é obrigatorio."),
	mesReferencia: z.string({ message: "Mes de referencia é obrigatorio." }),
	energiaEletricaValor: z
		.string()
		.min(1, "Valor energia eletrica é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
	energiaEletricaQuantidade: z
		.string()
		.min(1, "Quantidade energia eletrica é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
	energiaSceeValor: z
		.string()
		.min(1, "Valor energia SCEEE é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
	energiaSceeQuantidade: z
		.string()
		.min(1, "Quantidade energia SCEEE é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
	energiaCompensadaValor: z
		.string()
		.min(1, "Valor energia compensada é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
	energiaCompensadaQuantidade: z
		.string()
		.min(1, "Quantidade energia compensada é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
	contribilum: z
		.string()
		.min(1, "Contrib llum é obrigatorio.")
		.transform((value) => value.replace(".", "").replace(",", ".")),
});

type FaturaCreateType = z.infer<typeof faturaCreateSchema>;
