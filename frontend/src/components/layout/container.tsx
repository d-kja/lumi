import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

interface ContainerProps extends ComponentProps<"div"> {
	children: ReactNode;
}

export const Container = ({
	children,
	className,
	...props
}: ContainerProps) => {
	return (
		<div className={cn("px-6 py-4", className)} {...props}>
			{children}
		</div>
	);
};
