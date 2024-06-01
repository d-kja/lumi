export const setupGraph = ({
	series,
	categories,
	mode,
}: SetupGraphRequest) => ({
	series,
	options: {
		colors:
			mode === "light"
				? ["#52525b", "#a5b4fc", "#fed7aa", "#fca5a5"]
				: ["#fafafa", "#c7d2fe", "#bbf7d0", "#fed7aa"],
		theme: {
			mode,
		},
		grid: {
			show: false,
		},
		chart: {
			background: "transparent",
			height: 350,
			type: "line",
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories,
		},
		stroke: {
			curve: "smooth",
		},
		fill: {
			type: "gradient",
			gradient: {
				opacityFrom: 0,
				opacityTo: 1,
				type: "horizontal",
				stops: [0, 70, 100],
			},
		},
	},
});

type SetupGraphRequest = {
	series: GraphSerie[];
	categories: string[];
	mode?: string;
};

export type GraphSerie = {
	name: string;
	data: number[];
};
