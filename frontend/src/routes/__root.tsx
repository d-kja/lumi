import { Outlet, createRootRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/container";
import { Navigation } from "@/components/layout/navigation";
import { Toaster } from "@/components/ui/sonner";

import { queryClient } from "@/lib/api/api-handler";
import { ThemeProvider } from "@/stores/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>
				<Container className="flex flex-col h-full lg:max-h-dvh max-w-[1840px] mx-auto">
					<Navigation />
					<Outlet />
				</Container>
			</QueryClientProvider>
			<Toaster position="top-right" />
		</ThemeProvider>
	),
});
