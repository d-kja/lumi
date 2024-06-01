import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFaturaDownload } from "./hooks/api/useFaturaDownload";

export type Invoice = {
	id: string;
	client: string;
	electricalAmount: string;
	electricalPrice: string;
	sceeeAmount: string;
	sceeePrice: string;
	compensatedAmount: string;
	compensatedPrice: string;
	contribIlum: string;
	referenceMonth: string;
};

export const invoiceColumns: ColumnDef<Invoice>[] = [
	{
		accessorKey: "client",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Cliente
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "referenceMonth",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Mes/Ano
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "electricalPrice",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					⚡ Elétrica (R$)
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "electricalAmount",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					⚡ Elétrica (QTD)
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "sceeePrice",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					⚡ SCEEE s/ICMS (R$)
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "sceeeAmount",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					⚡ SCEEE s/ICMS (QTD)
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "compensatedPrice",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					⚡ Compensada (R$)
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "compensatedAmount",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					⚡ Compensada (QTD)
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		accessorKey: "contribIlum",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Contrib Ilum
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const invoice = row.original;
			const { downloadFatura } = useFaturaDownload();

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Opções</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => downloadFatura(invoice.id)}>
							Baixar fatura
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
