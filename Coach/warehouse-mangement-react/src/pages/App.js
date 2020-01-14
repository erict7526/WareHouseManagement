import React, { useState } from "react";
import "../css/App.css";
import LoginView from "./LoginView.js";
import MainManagementView from "./MainManagementView.js";

function App() {
	const [isUserLogin, setIsUserLogin] = useState(false);
	let element;

	if (isUserLogin) {
		element = (
			<MainManagementView
				className="MainManagementView"
				setIsUserLogin={setIsUserLogin}
			/>
		);
	} else {
		element = (
			<div className="LoginView">
				<LoginView setIsUserLogin={setIsUserLogin} />
			</div>
		);
	}
	return element;
}

export default App;
