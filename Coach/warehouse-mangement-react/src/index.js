import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./pages/App";
import MainManagementView from "./pages/MainManagementView.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { Provider, createClient } from "urql";

import { BrowserRouter as Router } from "react-router-dom";

const client = new createClient({
	url: "http://localhost:5000/graphql",
});

// client
// 	.query({
// 		query: gql`
// 			{
// 				allLastDetails(first: 100) {
// 					nodes {
// 						no
// 						productNo
// 						id
// 						name
// 						spec
// 						unit
// 						countx
// 					}
// 				}
// 			}
// 		`
// 	})
// 	.then(res => {
// 		console.log(res);
// 	});

ReactDOM.render(
	<Provider value={client}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);
