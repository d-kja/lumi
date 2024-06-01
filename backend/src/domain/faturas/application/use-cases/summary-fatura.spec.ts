import { makeFatura } from "../../../../../test/factories/make-fatura";
import { InMemoryFaturaRepository } from "../../../../../test/in-memory-repositories/in-memory-fatura.repository";
import { SummaryFaturasService } from "./summary-fatura.service";

let faturaRepository: InMemoryFaturaRepository;
let service: SummaryFaturasService;

describe("@use-case/summary-faturas", () => {
	beforeEach(() => {
		faturaRepository = new InMemoryFaturaRepository();
		service = new SummaryFaturasService(faturaRepository);
	});

	it("should be able to yield the summary with empty string search", async () => {
		const faturas = Array.from({ length: 5 }).map((_) => makeFatura());
		faturaRepository.database = faturas;

		const response = await service.handle({
			numeroCliente: "", // simulating empty queries
		});

		if (response.isLeft())
			throw new Error(
				"@use-case/summary-faturas invalid service handle request",
			);

		const item = faturas[0];

		expect(response.value).toEqual(
			expect.objectContaining({
				[item.mesReferencia]: expect.arrayContaining([
					expect.objectContaining({
						consumoEnergiaEletrica:
							item.energiaEletrica.quantidade + item.energiaScee.quantidade,
						energiaCompensada: item.energiaCompensada.quantidade,
						totalSemGD:
							Number(item.energiaEletrica.valor) +
							Number(item.energiaScee.valor) +
							Number(item.contriblum),
						economiaGD: Number(item.energiaCompensada.valor),
						numeroCliente: item.numeroCliente,
					}),
				]),
			}),
		);
	});

	it("should be able to yield a summary based on the search", async () => {
		const faturas = Array.from({ length: 5 }).map((_) => makeFatura());
		faturaRepository.database = faturas;

		const faturaToSearch = faturas[0].numeroCliente;
		const referenceMonth = faturas[0].mesReferencia;

		const response = await service.handle({
			numeroCliente: faturaToSearch,
		});

		if (response.isLeft())
			throw new Error(
				"@use-case/summary-faturas invalid service handle request",
			);

		expect(response.value[referenceMonth]).toHaveLength(1);
	});
});
