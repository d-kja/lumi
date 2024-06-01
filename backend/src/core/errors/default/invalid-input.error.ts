export class InvalidInputError extends Error {
	constructor(message?: string) {
		super(message ?? "Faltando propriedades");
	}
}
