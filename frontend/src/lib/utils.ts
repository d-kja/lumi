import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const downloadFile = (name: string, data: Buffer | ArrayBufferLike) => {
	const blob = new Blob([new Uint8Array(data)], { type: "application/pdf" });
	const downloadUrl = URL.createObjectURL(blob);

	const link = document?.createElement("a");
	link.href = downloadUrl;
	link.download = name;
	link.setAttribute("target", "_blank");

	link.click();
	URL.revokeObjectURL(downloadUrl);
};

export const faturaReferenceMonthToDate = (referenceMonth: string) => {
	const [month, year] = referenceMonth.split("/");
	const monthIndex = convertMonthToIndex(month);

	const date = dayjs()
		.set("year", Number(year))
		.set("month", monthIndex)
		.set("date", 1);

	return date;
};

export const convertMonthToIndex = (month: string) => {
	switch (month) {
		case "JAN": {
			return 0;
		}
		case "FEV": {
			return 1;
		}
		case "MAR": {
			return 2;
		}
		case "ABR": {
			return 3;
		}
		case "MAI": {
			return 4;
		}
		case "JUN": {
			return 5;
		}
		case "JUL": {
			return 6;
		}
		case "AGO": {
			return 7;
		}
		case "SET": {
			return 8;
		}
		case "OUT": {
			return 9;
		}
		case "NOV": {
			return 10;
		}
		case "DEZ": {
			return 11;
		}
		default: {
			return 0;
		}
	}
};

export const months = [
	"JAN",
	"FEV",
	"MAR",
	"ABR",
	"MAI",
	"JUN",
	"JUL",
	"AGO",
	"SET",
	"OUT",
	"NOV",
	"DEZ",
];
export const priceFormatter = new Intl.NumberFormat("pt-br", {
	style: "currency",
	currency: "BRL",
});
