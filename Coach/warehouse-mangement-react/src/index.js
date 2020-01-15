import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import MainManagementView from "./pages/MainManagementView.js";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root")
);
