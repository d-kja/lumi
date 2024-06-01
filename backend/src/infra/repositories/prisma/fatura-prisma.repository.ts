import { prisma } from "./prisma.service";

import type { EntityId } from "@/core/entities/value-objects/entity-id";
import type { Fatura } from "@/domain/faturas/enterprise/entities/fatura.entity";
import type {
	FaturaFindManyRequest,
	FaturaRepository,
} from "@/domain/faturas/application/repositories/fatura.repository";
import { FaturaMapper } from "./mappers/fatura.mapper";

export class FaturaPrismaRepository implements FaturaRepository {
	async create(data: Fatura): Promise<Fatura> {
		const fatura = FaturaMapper.toPrisma(data);

		const createdFatura = await prisma.fatura.create({
			data: fatura,
		});

		return FaturaMapper.toEntity(createdFatura);
	}
	async update(data: Fatura): Promise<void> {
		const fatura = FaturaMapper.toPrisma(data);

		await prisma.fatura.update({
			where: {
				id: data.id.toString(),
			},
			data: {
				contribilum: fatura.contribilum,
				energiaScee: fatura.energiaScee,
				mesReferencia: fatura.mesReferencia,
				numeroCliente: fatura.numeroCliente,
				energiaEletrica: fatura.energiaEletrica,
				energiaCompensada: fatura.energiaCompensada,
				updatedAt: new Date(),
			},
		});
	}

	async deleteById(id: EntityId): Promise<void> {
		await prisma.fatura.delete({
			where: {
				id: id.toString(),
			},
		});
	}
	async findById(id: EntityId): Promise<Fatura | null> {
		const fatura = await prisma.fatura.findUnique({
			where: {
				id: id.toString(),
			},
		});

		if (!fatura) return null;

		return FaturaMapper.toEntity(fatura);
	}

	async findMany(props?: FaturaFindManyRequest): Promise<Fatura[]> {
		const faturas = await prisma.fatura.findMany({
			where: {
				numeroCliente: {
					startsWith: props?.numeroCliente ?? "",
				},
			},
		});

		return faturas.map(FaturaMapper.toEntity);
	}
}
