import { faker } from "@faker-js/faker";
import { InMemoryFaturaRepository } from "../../../../../test/in-memory-repositories/in-memory-fatura.repository";
import { CreateFaturaService } from "./create-fatura.service";
import { Fatura } from "../../enterprise/entities/fatura.entity";
import { InvalidInputError } from "@/core/errors/default/invalid-input.error";
import { InMemoryStorage } from "@/infra/storage/in-memory-storage";

let faturaRepository: InMemoryFaturaRepository;
let faturaStorage: InMemoryStorage;

describe("@use-case/create-fatura", () => {
	beforeEach(() => {
		faturaRepository = new InMemoryFaturaRepository();
		faturaStorage = new InMemoryStorage();
	});

	it("should be able to create a new fatura", async () => {
		const date = faker.date.recent();
		const fatura = {
			numeroCliente: faker.finance.accountNumber(3),
			contribilum: Number(faker.finance.amount()),
			mesReferencia: `${date.getMonth()}/${date.getFullYear()}`,
			energiaScee: {
				valor: Number(faker.finance.amount()),
				quantidade: faker.number?.int(),
			},
			energiaEletrica: {
				valor: Number(faker.finance.amount()),
				quantidade: faker.number?.int(),
			},
			energiaCompensada: {
				valor: Number(faker.finance.amount()),
				quantidade: faker.number?.int(),
			},
			fatura: Buffer.from("pog"),
		};

		const service = new CreateFaturaService(faturaRepository, faturaStorage);
		const response = await service.handle(fatura);

		if (response.isLeft())
			throw new Error("@use-case/create-fatura invalid service handle request");

		expect(response.isRight()).toBe(true);
		expect(response.value).toBeInstanceOf(Fatura);
		expect(faturaStorage.storage).toHaveLength(1);
	});

	it("shouldn't be able to create a new fatura with invalid parameters", async () => {
		// biome-ignore lint: it's supposed to break as I'm trying to send it with fields missing to check the parsing validation
		const fatura: any = {
			numeroCliente: false,
			contribilum: undefined,
			mesReferencia: "invalid",
			energiaScee: {
				quantidade: faker.number?.int(),
			},
			energiaCompensada: {
				valor: faker.finance.amount(),
				quantidade: faker.number?.int(),
			},
		};

		const service = new CreateFaturaService(faturaRepository, faturaStorage);
		const response = await service.handle(fatura);

		if (response.isRight())
			throw new Error("@use-case/create-fatura invalid service handle request");

		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(InvalidInputError);
	});
});
