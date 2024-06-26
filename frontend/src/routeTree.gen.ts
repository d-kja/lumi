/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";

// Create Virtual Routes

const IndexLazyImport = createFileRoute("/")();
const FaturaIndexLazyImport = createFileRoute("/fatura/")();
const FaturaCreateLazyImport = createFileRoute("/fatura/create")();

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
	path: "/",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const FaturaIndexLazyRoute = FaturaIndexLazyImport.update({
	path: "/fatura/",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/fatura/index.lazy").then((d) => d.Route));

const FaturaCreateLazyRoute = FaturaCreateLazyImport.update({
	path: "/fatura/create",
	getParentRoute: () => rootRoute,
} as any).lazy(() =>
	import("./routes/fatura/create.lazy").then((d) => d.Route),
);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/": {
			id: "/";
			path: "/";
			fullPath: "/";
			preLoaderRoute: typeof IndexLazyImport;
			parentRoute: typeof rootRoute;
		};
		"/fatura/create": {
			id: "/fatura/create";
			path: "/fatura/create";
			fullPath: "/fatura/create";
			preLoaderRoute: typeof FaturaCreateLazyImport;
			parentRoute: typeof rootRoute;
		};
		"/fatura/": {
			id: "/fatura/";
			path: "/fatura";
			fullPath: "/fatura";
			preLoaderRoute: typeof FaturaIndexLazyImport;
			parentRoute: typeof rootRoute;
		};
	}
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
	IndexLazyRoute,
	FaturaCreateLazyRoute,
	FaturaIndexLazyRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/fatura/create",
        "/fatura/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/fatura/create": {
      "filePath": "fatura/create.lazy.tsx"
    },
    "/fatura/": {
      "filePath": "fatura/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
