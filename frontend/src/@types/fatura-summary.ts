export type FaturasSummary = Record<string, Array<FaturaSummary>>;

export type FaturaSummary = {
	consumoEnergiaEletrica: number;
	energiaCompensada: number;
	totalSemGD: number;
	economiaGD: number;
	numeroCliente: string;
};
