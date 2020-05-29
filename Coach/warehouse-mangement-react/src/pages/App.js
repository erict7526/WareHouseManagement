import React, { useState } from "react";
import "./css/App.css";
import LoginView from "./LoginView.js";
import SignUpView from "./SignUpView.js";
import MainManagementView from "./MainManagementView.js";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
	const [currentUser, setCurrentUser] = useState(undefined);
	let element;

	element = (
		<Switch>
			<Route
				path="/login"
				render={(props) => (
					<LoginView setCurrentUser={setCurrentUser} {...props} />
				)}
			/>
			<Route
				path="/sign_up"
				render={(props) => (
					<SignUpView setCurrentUser={setCurrentUser} {...props} />
				)}
			/>
			<Route
				path="/main"
				render={(props) => (
					<MainManagementView
						currentUser={currentUser}
						setCurrentUser={setCurrentUser}
						{...props}
					/>
				)}
			/>
			<Route path="/">
				<Redirect to="/login" />
			</Route>
		</Switch>
	);

	return element;
}

export default App;
