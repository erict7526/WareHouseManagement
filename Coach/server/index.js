const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { postgraphile } = require("postgraphile");

const { randomNumber, searchByAPI, signUpUser } = require("./api.js");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
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
			enhanceGraphiql: true,
			appendPlugins: [randomNumber, searchByAPI, signUpUser],
		}
	)
);

app.listen(process.env.PORT || 5000);
