export const apiFaturaRoutes = {
	listFaturas: "/fatura",
	createFatura: "/fatura",
	summaryFatura: "/fatura/summary",
	downloadFatura: (id: string) => `/fatura/${id}/download`,
};
