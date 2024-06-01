import { Link } from "@tanstack/react-router";
import { Box } from "lucide-react";
import { ToggleTheme } from "../ui/theme-toggler";

export const Navigation = () => {
	return (
		<nav className="flex justify-between items-center pb-6">
			<div className="flex gap-6 w-min items-center">
				<Link to="/" className="text-primary/60 hidden md:flex">
					<Box size={24} strokeWidth={3} />
				</Link>

				<Link
					to="/"
					className="[&.active]:text-primary text-primary/45 hover:text-primary font-medium transition-colors"
				>
					Dashboard
				</Link>

				<Link
					to="/fatura"
					className="[&.active]:text-primary text-primary/45 hover:text-primary font-medium transition-colors"
				>
					Faturas
				</Link>
			</div>

			<ToggleTheme />
		</nav>
	);
};
