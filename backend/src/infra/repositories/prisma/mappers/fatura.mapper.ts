import type { Prisma, Fatura as PrismaFatura } from "@prisma/client";
import { Fatura } from "@/domain/faturas/enterprise/entities/fatura.entity";
import { EntityId } from "@/core/entities/value-objects/entity-id";

export class FaturaMapper {
	static toPrisma(data: Fatura): Prisma.FaturaUncheckedCreateInput {
		return {
			id: data.id.toString(),
			energiaScee: data.energiaScee,
			energiaCompensada: data.energiaCompensada,
			energiaEletrica: data.energiaEletrica,
			mesReferencia: data.mesReferencia,
			numeroCliente: data.numeroCliente,
			contribilum: data.contriblum,
			faturaURL: data.faturaURL,
		};
	}

	static toEntity(data: PrismaFatura): Fatura {
		const fatura = Fatura.create(
			{
				numeroCliente: data.numeroCliente,
				mesReferencia: data.mesReferencia,
				contribilum: data.contribilum,
				energiaScee: data.energiaScee as unknown as Fatura["energiaScee"],
				energiaEletrica:
					data.energiaEletrica as unknown as Fatura["energiaEletrica"],
				energiaCompensada:
					data.energiaCompensada as unknown as Fatura["energiaCompensada"],
				faturaURL: data.faturaURL ?? undefined,
			},
			EntityId.new(data.id),
		);

		if (fatura.isLeft()) {
			throw new Error("Fatura invalida");
		}

		return fatura.value;
	}
}
