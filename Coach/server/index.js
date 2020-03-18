const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { postgraphile } = require("postgraphile");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000"
	})
);

app.use(morgan("short"));

app.use(
	postgraphile(
		process.env.DATABASE_URL || "postgres:///sip_database",
		"public",
		{
			watchPg: true,
			graphiql: true,
			enhanceGraphiql: true
		}
	)
);

app.listen(process.env.PORT || 5000);
