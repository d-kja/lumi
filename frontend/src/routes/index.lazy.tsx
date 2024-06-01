import { Container } from "@/components/layout/container";
import { DashboardCard } from "@/components/layout/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setupGraph } from "@/lib/graph";
import { useFaturaSummary } from "@/lib/hooks/api/useFaturaSummary";
import {
	convertMonthToIndex,
	faturaReferenceMonthToDate,
	months,
	priceFormatter,
} from "@/lib/utils";
import { useTheme } from "@/stores/theme-provider";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import type { ApexOptions } from "apexcharts";
import { ArrowDown, ArrowUp, DollarSign, Package } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import Chart from "react-apexcharts";

const Dashboard = () => {
	const { theme } = useTheme();

	const [query, setQuery] = useState("");
	const queryRef = useRef<HTMLInputElement>(null);

	const { faturas = {} } = useFaturaSummary({ numeroCliente: query });
	const faturaKeys = Object.keys(faturas).sort((itemA, itemB) => {
		return (
			faturaReferenceMonthToDate(itemA).unix() -
			faturaReferenceMonthToDate(itemB).unix()
		);
	});

	const electricalSerie = faturaKeys.reduce((acc, monthRef) => {
		const [month] = monthRef.split("/");
		const monthIndex = convertMonthToIndex(month);
		const currentMonth = faturas[monthRef];
		const newItems = [];

		for (const summary of currentMonth) {
			const idxFound = acc.findIndex(
				(item) => item.client === summary.numeroCliente,
			);
			const lastItems = acc.splice(idxFound, 1)[0];
			const item =
				idxFound >= 0 && lastItems?.data?.length
					? lastItems.data
					: Array.from({ length: 12 }).fill(0);

			item[monthIndex] = Number(summary?.consumoEnergiaEletrica.toFixed(2));

			newItems.push({
				client: summary.numeroCliente,
				name: `${summary.numeroCliente} - Eletrica`,
				data: item,
			});
		}

		return acc.concat(newItems);
	}, [] as any[]);

	const compensatedSerie = faturaKeys.reduce((acc, monthRef) => {
		const [month] = monthRef.split("/");
		const monthIndex = convertMonthToIndex(month);
		const currentMonth = faturas[monthRef];
		const newItems = [];

		for (const summary of currentMonth) {
			const idxFound = acc.findIndex(
				(item) => item.client === summary.numeroCliente,
			);
			const lastItems = acc.splice(idxFound, 1)[0];
			const item =
				idxFound >= 0 && lastItems?.data?.length
					? lastItems.data
					: Array.from({ length: 12 }).fill(0);

			item[monthIndex] = Number(summary?.energiaCompensada.toFixed(2));

			newItems.push({
				client: summary.numeroCliente,
				name: `${summary.numeroCliente} - Compensated`,
				data: item,
			});
		}

		return acc.concat(newItems);
	}, [] as any[]);

	const totalWithoutGDSerie = faturaKeys.reduce((acc, monthRef) => {
		const [month] = monthRef.split("/");
		const monthIndex = convertMonthToIndex(month);
		const currentMonth = faturas[monthRef];
		const newItems = [];

		for (const summary of currentMonth) {
			const idxFound = acc.findIndex(
				(item) => item.client === summary.numeroCliente,
			);
			const lastItems = acc.splice(idxFound, 1)[0];
			const item =
				idxFound >= 0 && lastItems?.data?.length
					? lastItems.data
					: Array.from({ length: 12 }).fill(0);

			item[monthIndex] = Number(summary?.totalSemGD.toFixed(2));

			newItems.push({
				client: summary.numeroCliente,
				name: `${summary.numeroCliente} - Total sem GD`,
				data: item,
			});
		}

		return acc.concat(newItems);
	}, [] as any[]);

	const economyGDSerie = faturaKeys.reduce((acc, monthRef) => {
		const [month] = monthRef.split("/");
		const monthIndex = convertMonthToIndex(month);
		const currentMonth = faturas[monthRef];
		const newItems = [];

		for (const summary of currentMonth) {
			const idxFound = acc.findIndex(
				(item) => item.client === summary.numeroCliente,
			);
			const lastItems = acc.splice(idxFound, 1)[0];
			const item =
				idxFound >= 0 && lastItems?.data?.length
					? lastItems.data
					: Array.from({ length: 12 }).fill(0);

			item[monthIndex] = Number(summary?.economiaGD.toFixed(2));

			newItems.push({
				client: summary.numeroCliente,
				name: `${summary.numeroCliente} - Economia GD`,
				data: item,
			});
		}

		return acc.concat(newItems);
	}, [] as any[]);

	const energySerie = [...electricalSerie, ...compensatedSerie];
	const priceSerie = [...totalWithoutGDSerie, ...economyGDSerie];

	const graphTheme = theme && theme !== "system" ? theme : "light";
	const energyGraph = setupGraph({
		series: energySerie,
		mode: graphTheme,
		categories: months,
	});
	const priceGraph = setupGraph({
		series: priceSerie,
		mode: graphTheme,
		categories: months,
	});

	const cardSummary = Object.values(faturas).reduce(
		(acc, item) => {
			for (const value of item) {
				acc.total += value.totalSemGD;
				acc.economy += value.economiaGD;
				acc.compensated += value.energiaCompensada;
				acc.electrical += value.consumoEnergiaEletrica;
			}

			return acc;
		},
		{
			electrical: 0,
			compensated: 0,
			total: 0,
			economy: 0,
		},
	);

	const handleChangeQuery = (event: FormEvent) => {
		event.preventDefault();

		const value = queryRef.current?.value;
		setQuery(value ?? "");
	};

	return (
		<Container className="h-max lg:min-h-[calc(100dvh-120px)] flex flex-col gap-16 py-8 rounded-lg shadow-lg border border-transparent dark:border-primary/10">
			<div
				title="header"
				className="flex justify-between items-center flex-col md:flex-row gap-6 md:gap-2"
			>
				<h1 className="font-bold text-3xl mr-auto">Dashboard</h1>

				<form
					onSubmit={handleChangeQuery}
					className="flex flex-col md:flex-row gap-4"
				>
					<Input
						name="query"
						type="number"
						placeholder="Pesquisar por numero do cliente..."
						className="w-[calc(100dvw-120px)] md:w-80"
						ref={queryRef}
					/>

					<Button className="gap-2" type="submit">
						<MagnifyingGlassIcon className="w-4 h-4" /> Buscar
					</Button>
				</form>
			</div>

			<section title="dashboard data" className="flex flex-col flex-1 gap-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<DashboardCard
						title="Consumo Energia Eletrica"
						price={priceFormatter.format(cardSummary?.electrical ?? 0)}
						icon={<DollarSign className="w-4 h-4 opacity-50" />}
					/>
					<DashboardCard
						title="Energia Compensada"
						price={priceFormatter.format(cardSummary?.compensated ?? 0)}
						icon={<ArrowUp className="w-4 h-4 opacity-50" />}
					/>
					<DashboardCard
						title="Valor Total sem GD"
						price={priceFormatter.format(cardSummary?.total ?? 0)}
						icon={<Package className="w-4 h-4 opacity-50" />}
					/>
					<DashboardCard
						title="Economia GD"
						price={priceFormatter.format(cardSummary?.economy ?? 0)}
						icon={<ArrowDown className="w-4 h-4 opacity-50" />}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
					<Container className="h-full shadow rounded-xl border border-transparent dark:border-primary/10 flex flex-col gap-3">
						<strong>
							Energia (kWh){" "}
							<span className="text-xs font-extrabold text-primary/35">
								/ Mês
							</span>
						</strong>
						<Chart
							options={energyGraph.options as ApexOptions}
							series={energyGraph.series}
							width="100%"
							height="90%"
						/>
					</Container>
					<Container className="h-full shadow rounded-xl border border-transparent dark:border-primary/10 flex flex-col gap-3">
						<strong>
							Valores Monetários (R$){" "}
							<span className="text-xs font-extrabold text-primary/35">
								/ Mês
							</span>
						</strong>
						<Chart
							options={priceGraph.options as ApexOptions}
							series={priceGraph.series}
							width="100%"
							height="90%"
						/>
					</Container>
				</div>
			</section>
		</Container>
	);
};

export const Route = createLazyFileRoute("/")({
	component: Dashboard,
});
