import type { Fatura } from "@/domain/faturas/enterprise/entities/fatura.entity";
export class FaturaPresenter {
	static toHTPP(data: Fatura) {
		return {
			id: data.id.toString(),
			numeroCliente: data.numeroCliente,
			mesReferencia: data.mesReferencia,
			energiaEletrica: data.energiaEletrica,
			energiaScee: data.energiaScee,
			energiaCompensada: data.energiaCompensada,
			contriblum: data.contriblum,
		};
	}
}
