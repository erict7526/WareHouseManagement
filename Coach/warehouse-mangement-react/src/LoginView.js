import React, { useState, useEffect } from "react";
import react_logo from "./react-logo.png";
import "./LoginView.css";

function LoginView(props) {
	const setUserLogin = props.setUserLogin;
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	let element;

	element = (
		<div className="wrapper">
			<div className="header">
				<div className="logo">
					<img src={react_logo} alt="React Logo" />
				</div>
				<div className="form">
					<div className="input_field">
						<input
							type="text"
							id=""
							className="input"
							placeholder="Username"
						/>
					</div>
					<div className="input_field">
						<input
							type="password"
							className="input"
							placeholder="Password"
						/>
					</div>
					<div className="btn">
						<button>Log In</button>
					</div>
				</div>
			</div>
		</div>
	);

	return element;
}

export default LoginView;
