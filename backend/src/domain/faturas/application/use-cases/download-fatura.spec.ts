import { faker } from "@faker-js/faker";
import { InMemoryFaturaRepository } from "../../../../../test/in-memory-repositories/in-memory-fatura.repository";
import { CreateFaturaService } from "./create-fatura.service";
import { InMemoryStorage } from "@/infra/storage/in-memory-storage";
import { DownloadFaturaService } from "./download-fatura.service";

let faturaRepository: InMemoryFaturaRepository;
let faturaStorage: InMemoryStorage;

describe("@use-case/download-fatura", () => {
	beforeEach(() => {
		faturaRepository = new InMemoryFaturaRepository();
		faturaStorage = new InMemoryStorage();
	});

	it("should be able to download a fatura", async () => {
		const date = faker.date.recent();
		const createFaturaBody = {
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

		const createFatura = await new CreateFaturaService(
			faturaRepository,
			faturaStorage,
		).handle(createFaturaBody);

		if (createFatura.isLeft())
			throw new Error(
				"@use-case/download-fatura invalid create-fatura service handle request",
			);

		const service = new DownloadFaturaService(faturaRepository, faturaStorage);
		const response = await service.handle({
			id: createFatura.value.id,
		});

		if (response.isLeft())
			throw new Error("@use-case/create-fatura invalid service handle request");

		expect(response.isRight()).toBe(true);
		expect(response.value.file).toBeInstanceOf(Buffer);
	});
});
