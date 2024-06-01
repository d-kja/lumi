import type { EntityId } from "@/core/entities/value-objects/entity-id";
import type { Fatura } from "../../enterprise/entities/fatura.entity";

export interface FaturaRepository {
	create: (data: Fatura) => Promise<Fatura>;
	update: (data: Fatura) => Promise<void>;
	deleteById: (id: EntityId) => Promise<void>;
	findById: (id: EntityId) => Promise<Fatura | null>;
	findMany: (props?: FaturaFindManyRequest) => Promise<Fatura[]>;
}

export interface FaturaFindManyRequest {
	numeroCliente?: string;
}
