import { Container } from "@/components/layout/container";
import { DataTable } from "@/components/layout/data-table";
import { Button } from "@/components/ui/button";
import { useFaturaGetMany } from "@/lib/hooks/api/useFaturaGetMany";
import { invoiceColumns } from "@/lib/table";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { FileCode2, RefreshCcw } from "lucide-react";

const Invoices = () => {
	const {
		faturas = [],
		faturaGetManyRefetch,
		isFaturaGetManyLoading,
	} = useFaturaGetMany();

	return (
		<Container className="h-max min-h-[calc(100dvh-120px)] flex flex-col gap-16 py-8 rounded-lg shadow-lg border border-transparent dark:border-primary/10">
			<div
				title="header"
				className="flex justify-between items-center flex-col md:flex-row gap-6 md:gap-2"
			>
				<h1 className="font-bold text-3xl mr-auto">Faturas</h1>

				<div className="flex w-full md:w-auto flex-col-reverse md:flex-row gap-2">
					<Button
						variant={"ghost"}
						data-reloading={isFaturaGetManyLoading}
						disabled={isFaturaGetManyLoading}
						onClick={() => faturaGetManyRefetch()}
						className="group gap-2 w-full md:w-auto"
					>
						<RefreshCcw className="w-4 h-4 group-data-[reloading='true']:animate-spin" />
						{isFaturaGetManyLoading ? "Recarregando" : "Recarregar"}
					</Button>
					<Button className="gap-2 w-full md:w-auto" asChild>
						<Link to="/fatura/create">
							<FileCode2 className="w-4 h-4" /> Extrair PDF
						</Link>
					</Button>
				</div>
			</div>

			<DataTable
				columns={invoiceColumns}
				data={faturas?.map((fatura) => {
					return {
						id: fatura?.id,
						client: String(fatura?.numeroCliente),
						referenceMonth: fatura?.mesReferencia,
						sceeePrice: fatura?.energiaScee?.valor,
						contribIlum: fatura?.contriblum,
						sceeeAmount: String(fatura?.energiaScee?.quantidade),
						electricalPrice: fatura?.energiaEletrica?.valor,
						compensatedPrice: fatura?.energiaCompensada?.valor,
						electricalAmount: String(fatura?.energiaEletrica?.quantidade),
						compensatedAmount: String(fatura?.energiaCompensada?.quantidade),
					};
				})}
			/>
		</Container>
	);
};

export const Route = createLazyFileRoute("/fatura/")({
	component: Invoices,
});
