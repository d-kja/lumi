import type { ReactNode } from "react";
import { Container } from "./container";

export const DashboardCard = ({ title, price, icon }: DashboardCardProps) => (
	<Container
		title="card"
		className="shadow border border-transparent dark:border-primary/10 rounded-xl py-6"
	>
		<div className="flex justify-between items-center mb-2">
			<p className="text-sm font-medium">{title}</p>
			{icon}
		</div>

		<strong className="font-bold text-2xl leading-relaxed">{price}</strong>
	</Container>
);

interface DashboardCardProps {
	title: string;
	price: string;
	icon: ReactNode;
}
