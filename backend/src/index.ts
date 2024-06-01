import { env } from "./infra/env";
import { server } from "./server";

server.listen(
	{
		host: env.SERVER_HOST,
		port: env.PORT,
	},
	(error) => {
		if (error) {
			server.log.error(error);
			process.exit(1);
		}
	},
);
