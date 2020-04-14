import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import LoginForm from "./containers/LoginForm";

function App() {
	let element = (
		<Switch>
			<Route
				path="/login"
				render={(routeProps) => <LoginForm {...routeProps} />}
			/>
		</Switch>
	);
	return element;
}

export default App;
