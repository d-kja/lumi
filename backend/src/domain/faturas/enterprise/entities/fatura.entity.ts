import { Entity } from "@/core/entities/entity";
import type { EntityId } from "@/core/entities/value-objects/entity-id";
import { InvalidInputError } from "@/core/errors/default/invalid-input.error";
import { Left, Right, type Either } from "@/core/errors/either";
import { z } from "zod";

const faturaSchema = z.object({
	numeroCliente: z.string(),
	mesReferencia: z.string(),
	energiaEletrica: z.object({
		quantidade: z.number(),
		valor: z.number(),
	}),
	energiaScee: z.object({
		quantidade: z.number(),
		valor: z.number(),
	}),
	energiaCompensada: z.object({
		quantidade: z.number(),
		valor: z.number(),
	}),
	contribilum: z.number(),
	faturaURL: z.string().optional(),
});

export type FaturaType = z.infer<typeof faturaSchema>;

export class Fatura extends Entity<FaturaType> {
	get numeroCliente() {
		return this.props.numeroCliente;
	}

	get mesReferencia() {
		return this.props.mesReferencia;
	}

	get energiaEletrica() {
		return this.props.energiaEletrica;
	}

	get energiaScee() {
		return this.props.energiaScee;
	}

	get energiaCompensada() {
		return this.props.energiaCompensada;
	}

	get contriblum() {
		return this.props.contribilum;
	}

	get faturaURL() {
		return this.props.faturaURL;
	}

	set faturaURL(url: string | undefined) {
		this.props.faturaURL = url;
	}

	static create(
		props: FaturaType,
		id?: EntityId,
	): Either<InvalidInputError, Fatura> {
		const parsedProps = faturaSchema.safeParse(props);

		if (!parsedProps.success) {
			return Left.new(new InvalidInputError());
		}

		return Right.new(new Fatura(parsedProps.data, id));
	}
}
