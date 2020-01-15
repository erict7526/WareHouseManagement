import React, { useState } from "react";
import "../css/App.css";
import LoginView from "./LoginView.js";
import SignUpView from "./SignUpView.js";
import MainManagementView from "./MainManagementView.js";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
	const [isUserLogin, setIsUserLogin] = useState(false);
	let element;

	element = (
		<Switch>
			<Route
				path="/login"
				render={props => (
					<LoginView setIsUserLogin={setIsUserLogin} {...props} />
				)}
			/>
			<Route
				path="/sign_up"
				render={props => <SignUpView {...props} />}
			/>
			<Route
				path="/main"
				render={props => (
					<MainManagementView
						isUserLogin={isUserLogin}
						setIsUserLogin={setIsUserLogin}
						{...props}
					/>
				)}
			/>
			} />
			<Route path="/">
				<Redirect to="/login" />
			</Route>
		</Switch>
	);

	return element;
}

export default App;
