import React, { useState, useEffect } from "react";
import react_logo from "./react-logo.png";
import "./LoginView.css";

const passwordDict = { test: "test123456" };

function LoginView(props) {
	const setIsUserLogin = props.setIsUserLogin;
	const [username, setUsername] = useState("");
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
							value={username}
							onChange={e => {
								setUsername(e.target.value);
							}}
						/>
					</div>
					<div className="input_field">
						<input
							type="password"
							className="input"
							placeholder="Password"
							value={password}
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className="btn">
						<button
							onClick={() => {
								handleLoginButtonClicked(
									username,
									password,
									setIsUserLogin
								);
							}}
						>
							Log In
						</button>
					</div>
				</div>
				<div className="signUp">
					<p>Don't have an account?</p>
					<a href="#">Sign Up</a>
				</div>
			</div>
		</div>
	);

	return element;
}

function handleLoginButtonClicked(username, password, setIsUserLogin) {
	setIsUserLogin(passwordDict[username] === password);
}

export default LoginView;
