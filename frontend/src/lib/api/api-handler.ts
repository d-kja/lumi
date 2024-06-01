import { env } from "@/env";
import { QueryClient } from "@tanstack/react-query";
import axios, { type CreateAxiosDefaults } from "axios";

const REQUEST_TIMEOUT = 1000 * 30;
const BACKEND_URL = env.VITE_BACKEND_URL;
const REQUEST_HEADERS = {
	Accept: "application/json",
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
		mutations: {
			retry: 0,
		},
	},
});

export const api = (request?: CreateApiRequest) =>
	axios.create({
		baseURL: request?.baseURL ?? BACKEND_URL,
		timeout: request?.timeout ?? REQUEST_TIMEOUT,
		headers: {
			...REQUEST_HEADERS,
			...request?.headers,
		},
	});

export interface CreateApiRequest {
	headers?: CreateAxiosDefaults<any>["headers"];
	baseURL?: string;
	timeout?: number;
}

export const getMultipartHeader = () => ({
	"Content-Type": "multipart/form-data",
});
export const getAuthHeader = () => {
	const token = "cookie-lib";

	return { authorization: `Bearer ${token}` };
};
