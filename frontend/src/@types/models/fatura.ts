import type { Entity } from "./core-models";

export type FaturaModel = Entity & {
	numeroCliente: number;
	mesReferencia: string;
	energiaEletrica: {
		quantidade: number;
		valor: string;
	};
	energiaScee: {
		quantidade: number;
		valor: string;
	};
	energiaCompensada: {
		quantidade: number;
		valor: string;
	};
	contriblum: string;
};
