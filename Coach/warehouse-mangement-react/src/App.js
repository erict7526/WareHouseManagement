import React, { useState } from "react";
import "./App.css";
import LoginView from "./LoginView.js";

function App() {
	const [isUserLogin, setIsUserLogin] = useState(false);
	let element;
	if (isUserLogin) {
		element = (
			<div className="mainView">
				<h1>登入成功</h1>
			</div>
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
