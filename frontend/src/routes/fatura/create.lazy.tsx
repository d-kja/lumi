import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFaturaCreate } from "@/lib/hooks/api/useFaturaCreate";
import { usePDF } from "@/lib/hooks/usePdf";
import { FileCode2, Upload } from "lucide-react";
import { Controller } from "react-hook-form";

const CreateFatura = () => {
	const { form, createFatura } = useFaturaCreate();
	const { setValue, handleSubmit } = form;

	const { extractTextFromFile } = usePDF();

	const handleExtractPdf = async (file: File | null) => {
		if (!file) return;

		const text = await extractTextFromFile(file);

		setValue("numeroCliente", text.clientNumber);
		setValue("mesReferencia", text.dateReference);
		setValue("contribilum", text.contrib);
		setValue("energiaEletricaValor", text.electricalEnergy?.cost);
		setValue("energiaEletricaQuantidade", text.electricalEnergy?.amount);
		setValue("energiaSceeValor", text.sceeEnergy?.cost);
		setValue("energiaSceeQuantidade", text.sceeEnergy?.amount);
		setValue("energiaCompensadaValor", text.compensatedEnergy?.cost);
		setValue("energiaCompensadaQuantidade", text.compensatedEnergy?.amount);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit((data) => createFatura(data))}
				className="space-y-8"
			>
				<Container className="h-max min-h-[calc(100dvh-120px)] flex flex-col gap-16 py-8 rounded-lg shadow-lg border border-transparent dark:border-primary/10">
					<div
						title="header"
						className="flex justify-between items-center flex-col md:flex-row gap-6 md:gap-2"
					>
						<h1 className="font-bold text-3xl mr-auto">Extrair Fatura</h1>

						<div className="flex w-full md:w-auto flex-col-reverse md:flex-row gap-2">
							<Controller
								control={form.control}
								name="fatura"
								render={({ field }) => (
									<Button
										type="button"
										variant={"outline"}
										className="gap-2 w-full md:w-auto"
										asChild
									>
										<label>
											<Input
												id="fatura-pdf-input"
												className="hidden"
												type="file"
												accept="application/pdf"
												onChange={(event) => {
													const file = event?.target?.files?.[0];

													if (!file) return;

													field.onChange(file);
													handleExtractPdf(file);
												}}
												onBlur={field.onChange}
												name={field.name}
												ref={field.ref}
											/>
											<Upload className="w-4 h-4" /> Carregar PDF
										</label>
									</Button>
								)}
							/>

							<Button type="submit" className="gap-2 w-full md:w-44 ml-auto">
								<FileCode2 className="w-4 h-4" />
								Cadastrar Fatura
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<FormField
							control={form.control}
							name="numeroCliente"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Numero do cliente</FormLabel>

									<FormControl>
										<Input placeholder="000000..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="mesReferencia"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mes de referencia da fatura</FormLabel>

									<FormControl>
										<Input placeholder="MES/ANO" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="energiaEletricaValor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor energia eletrica</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>

									<FormDescription>
										O custo de energia eletrica na fatura em R$.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="energiaEletricaQuantidade"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantidade energia eletrica</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>

									<FormDescription>
										A quantidade de energia eletrica na fatura em kWh.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="energiaSceeValor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor energia SCEEE s/ICMS</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>

									<FormDescription>
										O custo de energia SCEEE s/ICMS na fatura em R$.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="energiaSceeQuantidade"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantidade energia SCEEE s/ICMS</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>

									<FormDescription>
										A quantidade de energia SCEEE s/ICMS na fatura em kWh.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="energiaCompensadaValor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor energia compensada</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>

									<FormDescription>
										O custo de energia compensada na fatura em R$.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="energiaCompensadaQuantidade"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantidade energia compensada</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>

									<FormDescription>
										A quantidade de energia compensada na fatura em kWh.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="contribilum"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contrib ilum publica municipal</FormLabel>

									<FormControl>
										<Input placeholder="0.0" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</Container>
			</form>
		</Form>
	);
};

export const Route = createLazyFileRoute("/fatura/create")({
	component: CreateFatura,
});
