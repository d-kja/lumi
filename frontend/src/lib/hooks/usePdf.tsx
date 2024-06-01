import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc =
	"../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

export const usePDF = () => {
	const extractTextFromFile = async (pdf: File) => {
		const fileBuffer = new Uint8Array(await pdf.arrayBuffer());
		const file = await pdfjs.getDocument(fileBuffer).promise;
		const firstPage = await file.getPage(1);

		const unfilteredContent = await firstPage.getTextContent();
		const text = unfilteredContent.items
			.map((item: Record<string, any>) => item.str)
			?.filter((item: string) => !!item && item !== " ");

		return getRelevantDataFromPdf(text);
	};

	const getRelevantDataFromPdf = (data: string[]) => {
		const clientNumberIdx = data.findIndex((item) => item === "Nº DO CLIENTE");
		const dateReferenceIdx = data.findIndex((item) => item === "Referente a");
		const electricalEnergyIdx = data.findIndex(
			(item) => item === "Energia Elétrica",
		);
		const sceeEnergyIdx = data.findIndex((item) =>
			item.startsWith("Energia SCEE"),
		);
		const compensatedEnergyIdx = data.findIndex((item) =>
			item.startsWith("Energia compensada"),
		);
		const contribIdx = data.findIndex(
			(item) => item === "Contrib Ilum Publica Municipal",
		);

		return {
			clientNumber: data[clientNumberIdx + 2],
			dateReference: data[dateReferenceIdx + 3],
			contrib: data[contribIdx + 1],
			electricalEnergy: {
				cost: electricalEnergyIdx > -1 ? data[electricalEnergyIdx + 4] : "0",
				amount: electricalEnergyIdx > -1 ? data[electricalEnergyIdx + 2] : "0",
			},
			sceeEnergy: {
				cost: sceeEnergyIdx > -1 ? data[sceeEnergyIdx + 4] : "0",
				amount: sceeEnergyIdx > -1 ? data[sceeEnergyIdx + 2] : "0",
			},
			compensatedEnergy: {
				cost: compensatedEnergyIdx > -1 ? data[compensatedEnergyIdx + 4] : "0",
				amount:
					compensatedEnergyIdx > -1 ? data[compensatedEnergyIdx + 2] : "0",
			},
		};
	};

	return {
		extractTextFromFile,
	};
};
