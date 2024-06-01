import { makeFatura } from "../../../../../test/factories/make-fatura";
import { InMemoryFaturaRepository } from "../../../../../test/in-memory-repositories/in-memory-fatura.repository";
import { ListFaturasService } from "./list-faturas.service";

let faturaRepository: InMemoryFaturaRepository;

describe("@use-case/list-faturas", () => {
	beforeEach(() => {
		faturaRepository = new InMemoryFaturaRepository();
	});

	it("should be able to list faturas", async () => {
		const faturas = Array.from({ length: 5 }).map((_) => makeFatura());
		faturaRepository.database = faturas;

		const service = new ListFaturasService(faturaRepository);
		const response = await service.handle();

		if (response.isLeft())
			throw new Error("@use-case/list-faturas invalid service handle request");

		expect(response.value).toHaveLength(5);
	});
});
