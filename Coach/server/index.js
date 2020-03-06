const { Client } = require("pg");
const client = new Client({
	user: "Coach",
	password: 0215,
	host: "localhost",
	database: "test",
	port: 5432
});
client.connect();

client
	.query("select * from things")
	.then(res => {
		console.log(res.rows[0]);
	})
	.catch(e => {
		console.log(e.stack);
	});
